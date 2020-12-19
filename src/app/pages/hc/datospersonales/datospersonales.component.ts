import { Component, OnInit } from '@angular/core';

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
    edad: [],
    
   
    
  });

  

  constructor(  private fb: FormBuilder, private actiRoute: ActivatedRoute,
                private router: Router, private usuarioService: UsuarioService ) { }

  ngOnInit(): void {

  
  }

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

    // Realizar el posteo mediante el servicio
    
    
    console.log(this.datospForm.value);

    this.usuarioService.paciente(this.datospForm.value).subscribe((resp: any) => {
      
    });

   
 
 Swal.fire('' , 'Paciente registrado exitosamente', 'success').then((result) => {
  if (result.value) {

   /*  en realidad aqui debe enviar a foto y firma */
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
