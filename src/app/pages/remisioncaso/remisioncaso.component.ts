import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-remisioncaso',
  templateUrl: './remisioncaso.component.html',
  styleUrls: ['./remisioncaso.component.scss']
})
export class RemisioncasoComponent implements OnInit {


  public formSubmitted = false;
  

  public remiForm = this.fb.group({
    descripcion: ['', Validators.required ],
    evaluacion: ['', Validators.required ],
    Diagnostica: ['', Validators.required ],
    cod: ['', Validators.required ],
    seguimiento: ['', Validators.required ],
    medicoentidad: ['', Validators.required ],
    observaciones: ['', Validators.required ],
   
   
    
  });


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {


  }


  remision() {
    this.formSubmitted = true;
    if ( this.remiForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }
    // Realizar el posteo mediante el servicio
    // enrutar a otra interfaz donde se haga el llenado de otras HC
    console.log(this.remiForm.value);
    

  }


}
