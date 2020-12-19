import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';



import { ActivatedRoute, Router } from '@angular/router';

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


  constructor(private consultaService: ConsultasService, private fb: FormBuilder, private actiRoute: ActivatedRoute, private router: Router) { 

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
      observaciones: ['', Validators.required ],
      paciente: [''],
      fecha:[]
      
    });

  }

  ngOnInit() {

   
    this.id = this.actiRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    
  /* traer la informacion del paciente con el id obtenido por la cedula en la consulta anterior */
    this.consultaService.pacienteporID(this.id).subscribe((resp: any) => {
      
      
      this.infoPaciente = resp.resultados;
      console.log(this.infoPaciente);

    });
    /* creo la fecha actual con la cual el registro es guardado */
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
      observaciones: ['', Validators.required ],
      paciente: [''],
      fecha:[]
      
        
      
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

  this.haForm.value.paciente = this.id;
  this.haForm.value.fecha = this.fecha;

  console.log(this.haForm.value);

  /* llamo al servicio de registro de formularios */

  this.consultaService.historiaA(this.haForm.value).subscribe((resp: any) => {

    console.log(resp);
      
  });

  Swal.fire('' , 'Paciente registrado exitosamente', 'success').then((result) => {
    if (result.value) {
  
     
      this.router.navigate(['/consultaP']);
    }
  });

 }
}

