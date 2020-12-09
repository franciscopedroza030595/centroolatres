import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-datospersonales',
  templateUrl: './datospersonales.component.html',
  styleUrls: ['./datospersonales.component.scss']
})
export class DatospersonalesComponent implements OnInit {

  

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
    
   
    
  });

  tipohi!: string;

  constructor(  private fb: FormBuilder, private actiRoute: ActivatedRoute,
                private router: Router ) { }

  ngOnInit(): void {

   /* recibo la variable tipoh para poder reenviar */
   this.tipohi = this.actiRoute.snapshot.paramMap.get('tipohi');
   console.log(this.tipohi);
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

    if (this.tipohi === 'historiaA') {

    this.router.navigate(['/historiaA']);
    
   } else if (this.tipohi === 'remision') {
    this.router.navigate(['/remision']);
   }
    
    

  }

}
