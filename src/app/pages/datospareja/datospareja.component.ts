import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-datospareja',
  templateUrl: './datospareja.component.html',
  styleUrls: ['./datospareja.component.scss']
})
export class DatosparejaComponent implements OnInit {

  
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
    
   
    
  });

  

  constructor( private fb: FormBuilder, private actiRoute: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {

    
  }

  datosPersonales() {
    this.formSubmitted = true;
    if ( this.datospForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }
    // Realizar el posteo mediante el servicio
    
    console.log(this.datospForm.value);
    // enrutar a otra interfaz donde se haga el llenado de otras HC
   
    

  }

}
