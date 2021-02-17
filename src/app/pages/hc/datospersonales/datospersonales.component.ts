import { Component, OnInit, ViewChild } from '@angular/core';

import {Subject, Observable} from 'rxjs';

import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';



@Component({
  selector: 'app-datospersonales',
  templateUrl: './datospersonales.component.html',
  styleUrls: ['./datospersonales.component.scss'] 
})
export class DatospersonalesComponent implements OnInit {


/* variable para firma */
  signature: string = '';
 

  /* ------------------- for camera ----------------- */
  webcam: string = '';
 

  /* ----------------------------------------------------------- */

  datePickerConfig = {
    // drops: 'up',
    format: 'MMM, YYYY',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: true,
    locale:'es'
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

 
  /* --------------------------camera--------------------------- */
  webimage(url:any){
    console.log(url);
    this.webcam = url;
  }

  /*----------- methods for signature ---------------------*/
  drawStart(url:any) {
    

    console.log(url);
    this.signature = url;
   
  
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
    //firma
    this.datospForm.value.firma = this.signature;

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
