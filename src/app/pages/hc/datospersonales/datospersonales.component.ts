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
    format: 'YYYY-MM-DD'
  }

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
    
   
    
  });

  tipohi!: string;

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


  

}
