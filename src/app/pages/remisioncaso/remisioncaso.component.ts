import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

import Swal from 'sweetalert2';

import {formatDate} from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

import { ConsultasService } from '../../services/consultas.service';



@Component({
  selector: 'app-remisioncaso',
  templateUrl: './remisioncaso.component.html',
  styleUrls: ['./remisioncaso.component.scss']
})
export class RemisioncasoComponent implements OnInit {

  fecha: any;
  id: any;
  remisionesA = 0;
  remisionN = 0;


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


  constructor(private consultaService: ConsultasService, private fb: FormBuilder, private actiRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.id = this.actiRoute.snapshot.paramMap.get('id');
    console.log(this.id);


  }


  remision() {
    this.formSubmitted = true;
    if ( this.remiForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }
    // Realizar el posteo mediante el servicio
    
    console.log(this.remiForm.value);
    

  }


}
