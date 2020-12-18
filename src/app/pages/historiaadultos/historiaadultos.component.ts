import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';



import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

import { ConsultasService } from '../../services/consultas.service';

import {formatDate} from '@angular/common';

@Component({
  selector: 'app-historiaadultos',
  templateUrl: './historiaadultos.component.html',
  styleUrls: ['./historiaadultos.component.scss']
})
export class HistoriaadultosComponent implements OnInit {



  id: any;
  infoPaciente: any;
  fecha: any;

  public formSubmitted = false;
  haForm:FormGroup;


  constructor(private consultaService: ConsultasService, private fb: FormBuilder, private actiRoute: ActivatedRoute) { 

    this.haForm = this.fb.group({
      motivo: ['', Validators.required ],
      evolucion: ['', Validators.required ],
      caracteristicaf: this.fb.array([this.fb.group({
        nombreyapellido: ['', Validators.required ],
        parentesco: ['', Validators.required ],
        edad: ['', Validators.required ],
        ocupacion: ['', Validators.required ],
        escolaridad: ['', Validators.required ],
        viveconpte: ['', Validators.required ]
      })]),
      historiaf: ['', Validators.required ],
      relacionesa: ['', Validators.required ],
      recuperacion: ['', Validators.required ],
      opinion: ['', Validators.required ],
      objetivos: ['', Validators.required ],
      proximas: ['', Validators.required ],
      observaciones: ['', Validators.required ]
      
    });

  }

  ngOnInit() {

   
    this.id = this.actiRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    

    this.consultaService.pacienteporID(this.id).subscribe((resp: any) => {
      
      
      this.infoPaciente = resp.resultados;
      console.log(this.infoPaciente);

    });
    
    this.fecha = formatDate(new Date(), 'YYYY-MM-dd', 'en');
    

    /* creo el form para la historia clinica con las caracteristicas de los familiares */
    /* aqui va el cuadros de las caracteristicas de los familiares */
    this.haForm = this.fb.group({
      motivo: ['', Validators.required ],
      evolucion: ['', Validators.required ],
      caracteristicaf: this.fb.array([this.fb.group({
        nombreyapellido: ['', Validators.required ],
        parentesco: ['', Validators.required ],
        edad: ['', Validators.required ],
        ocupacion: ['', Validators.required ],
        escolaridad: ['', Validators.required ],
        viveconpte: ['', Validators.required ]
      })]),
      historiaf: ['', Validators.required ],
      relacionesa: ['', Validators.required ],
      recuperacion: ['', Validators.required ],
      opinion: ['', Validators.required ],
      objetivos: ['', Validators.required ],
      proximas: ['', Validators.required ],
      observaciones: ['', Validators.required ]
      
        
      
    });
  }

  get caracteristicaf() {
    return this.haForm.get('caracteristicaf') as FormArray;
  }


  addF() {
    console.log('yeah');

    this.formSubmitted = true;

    console.log(this.haForm.value);

    console.log(this.caracteristicaf.value);

    this.caracteristicaf.push(this.fb.group({
      nombreyapellido: ['', Validators.required ],
      parentesco: ['', Validators.required ],
      edad: ['', Validators.required ],
      ocupacion: ['', Validators.required ],
      escolaridad: ['', Validators.required ],
      viveconpte: ['', Validators.required ]
    }));
  }

  deleteF(index: any) {
    this.caracteristicaf.removeAt(index);
  }

 historiaadulto() {

  this.formSubmitted = true;

  if ( this.haForm.invalid ) {
    Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
    return;
  }
  console.log(this.haForm.value);

 }
}

