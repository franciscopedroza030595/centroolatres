import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';



import {  Router } from '@angular/router';

import Swal from 'sweetalert2';

import { ConsultasService } from '../../services/consultas.service';

import {formatDate} from '@angular/common';

@Component({
  selector: 'app-grupos',
  templateUrl: 'grupos.component.html', 
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  fecha: any;
  fechaFin: any;

  numeroP = 1;
  /* number for search */
  nSearch = 0;
  /* array of names of patients */
  nameP:any = [];
 
  

  public formSubmitted = false;
  grupoForm:FormGroup;

  constructor(private consultaService: ConsultasService, private fb: FormBuilder, private router: Router) { 

    this.grupoForm = this.fb.group({
      nombre: ['', Validators.required ],
      area: ['', Validators.required ],
      asistentes: this.fb.array([this.fb.group({
        paciente: ['', Validators.required ] 
      })]),
      numeroP: [ ],
      tema: ['', Validators.required ],
      objetivos: ['', Validators.required ],
      metodologia: ['', Validators.required ],
      fecha:[],
      fechaFin:[]
      
    });
  }

  ngOnInit(): void {

    /* inicializar el grupoform */
    this.grupoForm = this.fb.group({
      nombre: ['', Validators.required ],
      area: ['', Validators.required ],
      numeroP: [ ],
      asistentes: this.fb.array([this.fb.group({
        paciente: ['', Validators.required ]
      })]),
      tema: ['', Validators.required ],
      objetivos: ['', Validators.required ],
      metodologia: ['', Validators.required ],
      fecha:[],
      fechaFin:[]
      
    });


     /* creo la fecha actual con la cual el registro es guardado */
     this.fecha = formatDate(new Date(), 'YYYY-MM-dd, h:mm:ss a', 'en');
     
  }


  get asistentes() {
    return this.grupoForm.get('asistentes') as FormArray;
  }




  /* metodo para traer asistentes por cedula de paciente */

  addP() {
    this.nSearch++;
    this.numeroP++;
    

      this.formSubmitted = true;
  
      
  
      // console.log(this.asistentes.value);
  
      this.asistentes.push(this.fb.group({
        paciente: ['', Validators.required ]
      }));


  }

  deleteP() {
    // this.asistentes.removeAt(index);
    this.asistentes.removeAt(this.asistentes.length - 1);

    this.numeroP--;
    this.nSearch--;
  }

  /* metodo buscar paciente */
  search(){


    this.consultaService.obtenerPaciente(this.asistentes.value[this.nSearch].paciente).subscribe((resp: any) => {
      

      if(resp.resultados !== null) {

        this.nameP[this.nSearch] = resp.resultados.nombreyapellido;

        this.asistentes.value[this.nSearch].paciente = resp.resultados.uid;

      }else {
        Swal.fire('' , 'Paciente No Existente, por favor registre el paciente primero', 'error').then((result) => {
          if (result.value) {
      
          
          }
        });
      }


    });

    
  }


  /* method to create the group */

  crearGrupo(){

    this.formSubmitted = true;


    if ( this.grupoForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }

/*         if (this.nameP[this.nSearch] === '') {

          Swal.fire('Advertencia' , 'Por favor busque el paciente', 'error');
      return;

    } else {
      

    } */

    this.grupoForm.value.fecha = this.fecha;

    /* end date */
    this.fechaFin = formatDate(new Date(), 'YYYY-MM-dd, h:mm:ss a', 'en');

    this.grupoForm.value.fechaFin = this.fechaFin;

    /* numero de participantes(pacientes) */
    this.grupoForm.value.numeroP = this.numeroP;

    // console.log(this.grupoForm.value);

     /* llamo al servicio de registro de formularios */

  this.consultaService.grupo(this.grupoForm.value).subscribe((resp: any) => {

    // console.log(resp);
      
  });

  Swal.fire('' , 'Terapia De Grupo registrada exitosamente', 'success').then((result) => {
    if (result.value) {
  
     
      this.router.navigate(['/consultaP']);
    }
  });


  }

}
