import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';



import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { ConsultasService } from '../../services/consultas.service';

import {formatDate} from '@angular/common';

@Component({
  selector: 'app-terapiaocupa',
  templateUrl: './terapiaocupa.component.html',
  styleUrls: ['./terapiaocupa.component.scss']
})
export class TerapiaocupaComponent implements OnInit {



  id: any;
  infoPaciente: any;
  fecha: any;

  public formSubmitted = false;
  terapiaForm:FormGroup;

  constructor(private consultaService: ConsultasService, private fb: FormBuilder, private actiRoute: ActivatedRoute, private router: Router) {

        // terapiaFrom
 
        this.terapiaForm = this.fb.group({
          motivo: ['', Validators.required ],
          diagnosticoP: ['', Validators.required ],
          otrosD: ['', Validators.required ],
          tolerancia: ['', Validators.required ],
          deformidades: ['', Validators.required ],
          edema: ['', Validators.required ],
          rangoA: ['', Validators.required ],
          fuerzaM: ['', Validators.required ],
          reacciones: ['', Validators.required ],
          control: ['', Validators.required ],
          marcha: ['', Validators.required ],
          coordinacion: ['', Validators.required ],
          destreza: ['', Validators.required ],
          vista: ['', Validators.required ],
          oido: ['', Validators.required ],
          sensibilidad: ['', Validators.required ],
          propiocepcion: ['', Validators.required ],
          conciencia: ['', Validators.required ],
          atencion: ['', Validators.required ],
          memoria: ['', Validators.required ],
          orientacion: ['', Validators.required ],
          esquema: ['', Validators.required ],
          afasia: ['', Validators.required ],
          apraxia: ['', Validators.required ],
          agnosia: ['', Validators.required ],
          funciones: ['', Validators.required ],
          interes: ['', Validators.required ],
          autocontrol: ['', Validators.required ],
          habilidades: ['', Validators.required ],
          problemas: ['', Validators.required ],
          estado: ['', Validators.required ],
          objetivos: ['', Validators.required ],
          actividades: ['', Validators.required ],
    
          paciente: [''],
          fecha:[]
          
            
          
        });
   }

  ngOnInit(): void {

    this.id = this.actiRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    
  /* traer la informacion del paciente con el id obtenido por la cedula en la consulta anterior */
    this.consultaService.pacienteporID(this.id).subscribe((resp: any) => {
      
      
      this.infoPaciente = resp.resultados;
      console.log(this.infoPaciente);

    });
    /* creo la fecha actual con la cual el registro es guardado */
    this.fecha = formatDate(new Date(), 'YYYY-MM-dd, h:mm:ss a', 'en');


    // terapiaFrom
 
    this.terapiaForm = this.fb.group({
      motivo: ['', Validators.required ],
      diagnosticoP: ['', Validators.required ],
      otrosD: ['', Validators.required ],
      tolerancia: ['', Validators.required ],
      deformidades: ['', Validators.required ],
      edema: ['', Validators.required ],
      rangoA: ['', Validators.required ],
      fuerzaM: ['', Validators.required ],
      reacciones: ['', Validators.required ],
      control: ['', Validators.required ],
      marcha: ['', Validators.required ],
      coordinacion: ['', Validators.required ],
      destreza: ['', Validators.required ],
      vista: ['', Validators.required ],
      oido: ['', Validators.required ],
      sensibilidad: ['', Validators.required ],
      propiocepcion: ['', Validators.required ],
      conciencia: ['', Validators.required ],
      atencion: ['', Validators.required ],
      memoria: ['', Validators.required ],
      orientacion: ['', Validators.required ],
      esquema: ['', Validators.required ],
      afasia: ['', Validators.required ],
      apraxia: ['', Validators.required ],
      agnosia: ['', Validators.required ],
      funciones: ['', Validators.required ],
      interes: ['', Validators.required ],
      autocontrol: ['', Validators.required ],
      habilidades: ['', Validators.required ],
      problemas: ['', Validators.required ],
      estado: ['', Validators.required ],
      objetivos: ['', Validators.required ],
      actividades: ['', Validators.required ],

      paciente: [''],
      fecha:[]
      
        
       
    });
  }


  terapiaOcu() {

    this.formSubmitted = true;
  
   
  
    if ( this.terapiaForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }
  
    this.terapiaForm.value.paciente = this.id;
    this.terapiaForm.value.fecha = this.fecha;
  
    console.log(this.terapiaForm.value);
  
    /* llamo al servicio de registro de formularios */
  
    this.consultaService.terapiaO(this.terapiaForm.value).subscribe((resp: any) => {
  
      console.log(resp);
        
    });
  
    Swal.fire('' , 'Terapia Ocupacional De Paciente registrado exitosamente', 'success').then((result) => {
      if (result.value) {
    
       
        this.router.navigate(['/consultaP']);
      }
    });
  
   }





}
