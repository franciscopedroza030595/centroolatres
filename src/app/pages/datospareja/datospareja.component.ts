import { Component, OnInit, ViewChild } from '@angular/core';

import {Subject, Observable} from 'rxjs';

import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';


/* for signature */
import { SignaturePad } from 'angular2-signaturepad';

/* for camera */
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';



@Component({
  selector: 'app-datospareja',
  templateUrl: './datospareja.component.html',
  styleUrls: ['./datospareja.component.scss']
})
export class DatosparejaComponent implements OnInit {


    /* for signature  */

    @ViewChild(SignaturePad) signaturePad: SignaturePad;

    @ViewChild(SignaturePad) signaturePad2: SignaturePad;


    signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
      'minWidth': 1,
      'canvasWidth': 550,
      'canvasHeight': 200,
      
      
    };

    
  /* variable para firma1 */
    signature: string = '';

    /* variable para firma2 */
    signature2: string = '';
   
  
    /* --------------------------------- */

    /* ------------------- for camera ----------------- */

    // toggle webcam on/off
    public showWebcam = true;
   
    public errors: WebcamInitError[] = [];
  
    // latest snapshot
    public webcamImage: WebcamImage; 

     // latest snapshot 2
     public webcamImage2: WebcamImage;
  
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();

     // webcam snapshot trigger 2
     private trigger2: Subject<void> = new Subject<void>();
  
    /* variable para foto1 */

    webcam: string = '';

    /* variable para foto2 */

    webcam2: string = '';

  /* ----------------------------------------------------------- */


  datePickerConfig = {
    drops: 'up',
    format: 'YYYY-MM-DD',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: true,
  }

  edadP1 = 0 ;
  edadP2 = 0 ;

  
  public formSubmitted = false;


  public datospForm = this.fb.group({
    nombreyapellido: ['', Validators.required ],
    lugarnacimiento: ['', Validators.required ],
    fechanacimiento: ['', Validators.required ],
    ocupacion: ['', Validators.required ],
    direccion: ['', Validators.required ],
    telefono: ['', Validators.required ],
    cedula: ['', Validators.required ],
    escolaridad: ['', Validators.required ],
    estrato: ['', Validators.required ],
    eps: ['', Validators.required ],
    edad:[],
    firma:[''],
    foto:[''],
    nombreyapellido2: ['', Validators.required ],
    lugarnacimiento2: ['', Validators.required ],
    fechanacimiento2: ['', Validators.required ],
    ocupacion2: ['', Validators.required ],
    direccion2: ['', Validators.required ],
    telefono2: ['', Validators.required ],
    cedula2: ['', Validators.required ],
    escolaridad2: ['', Validators.required ],
    estrato2: ['', Validators.required ],
    eps2: ['', Validators.required ],
    edad2:[],
    firma2:[''],
    foto2:['']
    
   
    
  });

  

  constructor( private fb: FormBuilder, private actiRoute: ActivatedRoute,
               private router: Router, private usuarioService: UsuarioService ) {


                }

  ngOnInit(): void {



    
  }

    /*---------------- methods for camera ---------------------*/

    public triggerSnapshot(): void {
      this.trigger.next();
    }

    public triggerSnapshot2(): void {
      this.trigger2.next();
    }
  
  /* for errors */
    public handleInitError(error: WebcamInitError): void {
      this.errors.push(error);
    }
  
   
  /* handle of 2 cameras */
    public handleImage(webcamImage: WebcamImage): void {
      console.info('received webcam image', webcamImage);
      this.webcamImage = webcamImage;
      
  
      this.webcam = this.webcamImage.imageAsDataUrl;
      console.log( this.webcam);
    
    }

    public handleImage2(webcamImage2: WebcamImage): void {
      console.info('received webcam image', webcamImage2);
      this.webcamImage2 = webcamImage2;
      
  
      this.webcam2 = this.webcamImage2.imageAsDataUrl;
      console.log( this.webcam2);
    
    }
  
   
  /* triggers observables for 2 fotos */
    public get triggerObservable(): Observable<void> {
      return this.trigger.asObservable();
    }

    public get triggerObservable2(): Observable<void> {
      return this.trigger2.asObservable();
    }
  
   
  
    /* ---------------------------------------------------------- */

    /*----------- methods for signature ---------------------*/
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('backgroundColor', 'rgb(255, 255, 255)');  // Cambiar el color del fondo
    this.signaturePad.set('penColor', 'rgb(0, 0, 0)'); // Cambiar el color de la pluma
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API

    this.signaturePad2.set('backgroundColor', 'rgb(255, 255, 255)');  // Cambiar el color del fondo
    this.signaturePad2.set('penColor', 'rgb(0, 0, 0)'); // Cambiar el color de la pluma
    this.signaturePad2.clear(); // invoke functions from szimek/signature_pad API
    
  }

  clearSignature() {
    this.signaturePad.clear();
    
  }

  clearSignatureTwo() {
    this.signaturePad2.clear();
    
  }


  drawComplete() {

   
    this.signature = this.signaturePad.toDataURL();

    
    console.log(this.signature);

    this.signature2 = this.signaturePad2.toDataURL();
    
  
    console.log(this.signature2);
   

    /* this.datospForm.value.firma = this.signature; */
   
  } 

  drawComplete2() {

   
    this.signature2 = this.signaturePad2.toDataURL();
    
  
    console.log(this.signature2);

   
    /* this.datospForm.value.firma2 = this.signature2; */
  } 

 

  
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }




  /* ------------------------------------------------------------------- */


  datosPersonales() {
    this.formSubmitted = true;
    if ( this.datospForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }


     /* calcular la edad con la fechanan */
     this.edades(this.datospForm.value.fechanacimiento, this.datospForm.value.fechanacimiento2);
    

    this.datospForm.value.edad = this.edadP1;
    this.datospForm.value.edad2 = this.edadP2;

    
    console.log(this.datospForm.value);
    

/*     this.usuarioService.pareja(this.datospForm.value).subscribe((resp: any) => {
      
    });

   
 
 Swal.fire('' , 'Pareja registrada exitosamente', 'success').then((result) => {
  if (result.value) {

 
    this.router.navigate(['/registroP']);
  }
}); */
   
    

  }

  edades(edad1: any, edad2: any){


      const convertAge = new Date(edad1);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      const showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      
      this.edadP1 = showAge;

      const convertAge2 = new Date(edad2);
      const timeDiff2 = Math.abs(Date.now() - convertAge2.getTime());
      const showAge2 = Math.floor((timeDiff2 / (1000 * 3600 * 24))/365);
      
      this.edadP2 = showAge2;
      
      
   


  }

}
