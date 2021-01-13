import { Component, OnInit, ViewChild } from '@angular/core';

import {Subject, Observable} from 'rxjs';

import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';

/* for signature */
import { SignaturePad } from 'angular2-signaturepad';

/* for camera */
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';



@Component({
  selector: 'app-datospersonales',
  templateUrl: './datospersonales.component.html',
  styleUrls: ['./datospersonales.component.scss']
})
export class DatospersonalesComponent implements OnInit {

  /* for signature  */
  /* for signature  */

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 550,
    'canvasHeight': 200,
    
    
  };
/* variable para firma */
  signature: string = '';
 

  /* --------------------------------- */

  /* ------------------- for camera ----------------- */

    // toggle webcam on/off
    public showWebcam = true;
   
    public errors: WebcamInitError[] = [];
  
    // latest snapshot
    public webcamImage: WebcamImage = null;  
  
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
  
    /* variable para foto */

    webcam: string = '';

  /* ----------------------------------------------------------- */

  datePickerConfig = {
    drops: 'up',
    format: 'YYYY-MM-DD',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: true,
  }

  edadP = 0 ;

  public formSubmitted = false;


  public datospForm = this.fb.group({
    nombreyapellido: ['', Validators.required ],
    lugarnacimiento: ['', Validators.required ],
    fechanacimiento: ['', Validators.required],
    ocupacion: ['', Validators.required ],
    direccion: ['', Validators.required ],
    telefono: ['', Validators.required ],
    cedula: ['', Validators.required ],
    escolaridad: ['', Validators.required ],
    estrato: ['', Validators.required ],
    eps: ['', Validators.required ],
    nombreacudiente:[''],
    parentesco:[''],
    edad: [],
    firma:[''],
    foto:[''],
    
     
  });

  

  constructor(  private fb: FormBuilder, private actiRoute: ActivatedRoute,
                private router: Router, private usuarioService: UsuarioService  ) { 



                }

  ngOnInit(): void {

  
  }

  /*---------------- methods for camera ---------------------*/

  public triggerSnapshot(): void {
    this.trigger.next();
  }


  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

 

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    

    this.webcam = this.webcamImage.imageAsDataUrl;
    console.log( this.webcam);

    



  }

 

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

 

  /* ---------------------------------------------------------- */


  /*----------- methods for signature ---------------------*/
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('backgroundColor', 'rgb(255, 255, 255)');  // Cambiar el color del fondo
    this.signaturePad.set('penColor', 'rgb(0, 0, 0)'); // Cambiar el color de la pluma
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  drawComplete() {

   

    this.signature = this.signaturePad.toDataURL();
    
    console.log(this.signature);

    this.datospForm.value.firma = this.signature;
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
    this.edad(this.datospForm.value.fechanacimiento);

    console.log(this.edadP);
    
    this.datospForm.value.edad = this.edadP;
    
    /* asigno la foto */
    this.datospForm.value.foto = this.webcam;

    // Realizar el posteo mediante el servicio
    
    
    console.log(this.datospForm.value);

    this.usuarioService.paciente(this.datospForm.value).subscribe((resp: any) => {
      
    });

   
 
 Swal.fire('' , 'Paciente registrado exitosamente', 'success').then((result) => {
  if (result.value) {

   
    this.router.navigate(['/registroP']);
  }
});
 
    
    
    

  }

edad(edad: any){

  console.log(edad);

  const convertAge = new Date(edad);
  const timeDiff = Math.abs(Date.now() - convertAge.getTime());
  const showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  
  this.edadP = showAge;
  /* console.log(showAge); */


}
  

}
