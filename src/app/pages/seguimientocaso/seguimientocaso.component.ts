import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

import Swal from 'sweetalert2';

import {formatDate} from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-seguimientocaso',
  templateUrl: './seguimientocaso.component.html',
  styleUrls: ['./seguimientocaso.component.scss']
})
export class SeguimientocasoComponent implements OnInit {

  public formSubmitted = false;

  fecha: any;
  id: any;
  seccionesA = 0;
  secccionN = 0;

  secciones = false;

  infoSeguimientos: any;
  

  public seguiForm = this.fb.group({
    descripcion: ['', Validators.required ],
    situaciones: ['', Validators.required ],
    progreso: ['', Validators.required ],
    acuerdos: ['', Validators.required ],
    observaciones: ['', Validators.required ],
    ultima:['', Validators.required],
    paciente: [''],
    fecha:[]
   
    
  });

  constructor(private consultaService: ConsultasService, private fb: FormBuilder, private actiRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.id = this.actiRoute.snapshot.paramMap.get('id');
    console.log(this.id);


    this.consultaService.seguimientoID(this.id).subscribe((res: any) => {

      this.infoSeguimientos = res.resultados;
      console.log(this.infoSeguimientos);
      this.seccionesA = this.infoSeguimientos.length;
      this.secccionN = this.seccionesA + 1;
    
    });

        /* creo la fecha actual con la cual el registro es guardado */
        this.fecha = formatDate(new Date(), 'YYYY-MM-dd', 'en');
  }


  seguimiento() {
    this.formSubmitted = true;
    if ( this.seguiForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }
   
    this.seguiForm.value.paciente = this.id;
    this.seguiForm.value.fecha = this.fecha;


    console.log(this.seguiForm.value);
    

  }


  verSecciones(){

    console.log('s');
  }

}
