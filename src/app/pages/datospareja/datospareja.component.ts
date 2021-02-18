import { Component, OnInit } from '@angular/core';

import {Subject, Observable} from 'rxjs';

import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';




/* for camera */
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';



@Component({
  selector: 'app-datospareja',
  templateUrl: './datospareja.component.html',
  styleUrls: ['./datospareja.component.scss']
})
export class DatosparejaComponent implements OnInit {


  /* variable para firma1 */
    signature: string = '';

    /* variable para firma2 */
    signature2: string = '';
   

    /* ------------------- for camera ----------------- */
    /* variable para foto1 */

    webcam: string = '';

    /* variable para foto2 */

    webcam2: string = '';

  /* ----------------------------------------------------------- */


  datePickerConfig = {
    // drops: 'up',
    format: 'YYYY-MM-DD',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: true,
    locale:'es'
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

    webimage(url:any){
      this.webcam = url;
    }

    webimage2(url:any){
      this.webcam2 = url;
    }

   
  
    /* ---------------------------------------------------------- */

    /*----------- methods for signature ---------------------*/

  
  drawStart(url:any) {
      this.signature = url;
  } 
  drawStart2(url:any) {
    
    this.signature2 = url;
    this.datospForm.value.firma2 = this.signature2;
 
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


    this.datospForm.value.foto = this.webcam;
    this.datospForm.value.foto2 = this.webcam2;
    
    this.datospForm.value.firma = this.signature;
    this.datospForm.value.firma2 = this.signature2;

    this.datospForm.value.edad = this.edadP1;
    this.datospForm.value.edad2 = this.edadP2;

    
    // console.log(this.datospForm.value);
    

    this.usuarioService.pareja(this.datospForm.value).subscribe((resp: any) => {
      
    });

   
 
 Swal.fire('' , 'Pareja registrada exitosamente', 'success').then((result) => {
  if (result.value) {

 
    this.router.navigate(['/registroP']);
  }
});
   
    

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
