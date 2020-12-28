import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

import Swal from 'sweetalert2';

import {formatDate} from '@angular/common';

@Component({
  selector: 'app-seguimientocaso',
  templateUrl: './seguimientocaso.component.html',
  styleUrls: ['./seguimientocaso.component.scss']
})
export class SeguimientocasoComponent implements OnInit {

  public formSubmitted = false;

  fecha: any;
  

  public seguiForm = this.fb.group({
    descripcion: ['', Validators.required ],
    situaciones: ['', Validators.required ],
    progreso: ['', Validators.required ],
    acuerdos: ['', Validators.required ],
    observaciones: ['', Validators.required ],
    ultima:['', Validators.required],
    fecha:[]
   
    
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

        /* creo la fecha actual con la cual el registro es guardado */
        this.fecha = formatDate(new Date(), 'YYYY-MM-dd', 'en');
  }


  seguimiento() {
    this.formSubmitted = true;
    if ( this.seguiForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }
    // Realizar el posteo mediante el servicio
    // enrutar a otra interfaz donde se haga el llenado de otras HC
    console.log(this.seguiForm.value);
    

  }

}
