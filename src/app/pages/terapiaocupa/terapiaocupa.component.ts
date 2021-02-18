import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup  } from '@angular/forms';

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

  /* para radio buttons */
  data1: any[] =[];

  recibo:any;

  constructor(private consultaService: ConsultasService, private fb: FormBuilder, private actiRoute: ActivatedRoute, private router: Router) {

         // terapiaFrom
 
    this.terapiaForm = this.fb.group({
      motivo: ['', Validators.required ],
      diagnosticoP: ['', Validators.required ],
      otrosD: ['', Validators.required ],
      tolerancia: ['' ],
      deformidades: ['' ],
      edema: ['' ],
      rangoA: ['' ],
      fuerzaM: ['' ],
      reacciones: ['' ],
      control: ['' ],
      marcha: ['' ],
      coordinacion: ['' ],
      destreza: ['' ],
      vista: ['' ],
      oido: ['' ],
      sensibilidad: ['' ],
      propiocepcion: ['' ],
      conciencia: ['' ],
      atencion: ['' ],
      memoria: ['' ],
      orientacion: ['' ],
      esquema: ['' ],
      afasia: ['' ],
      apraxia: ['' ],
      agnosia: ['' ],
      funciones: ['' ],
      interes: ['' ],
      autocontrol: ['' ],
      habilidades: ['' ],
      problemas: ['' ],
      estado: ['' ],
      objetivos: ['', Validators.required ],
      actividades: ['', Validators.required ],

      paciente: [''],
      fecha:[]
      
        
       
    });
   }

  ngOnInit(): void {


     /* ---------- */

     this.data1 = [
      
      {
        titulo:'Tolerancia',
        name:'tolerancia',
        line:'Aspectos Motores',
        value:'Normal'
      },
      {
        titulo:'Deformidades',
        name:'deformidades',
        value:'Normal'
      },
      {
        titulo:'Edema',
        name:'edema',
        value:'Normal'
      }
      ,
      {
        titulo:'Rango articular',
        name:'rangoA',
        value:'Normal'
      }
      ,
      {
        titulo:'Fuerza muscular',
        name:'fuerzaM',
        value:'Normal'
      }
      ,
      {
        titulo:'Reacciones automáticas',
        name:'reacciones',
        value:'Normal'
      }
      ,
      {
        titulo:'Control postural',
        name:'control',
        value:'Normal'
      }
      ,
      {
        titulo:'Marcha / Equilibrio',
        name:'marcha',
        value:'Normal'
      },
      {
        titulo:'Coordinación',
        name:'coordinacion',
        value:'Normal'
      },
      {
        titulo:'Destreza manual',
        name:'destreza',
        value:'Normal'
      },
      {
        titulo:'Vista',
        name:'vista',
        line:'Componentes Sensoriales',
        value:'Normal'
      },
      {
        titulo:'Oído',
        name:'oido',
        value:'Normal'
      },
      

      {
        titulo:'Sensibilidad',
        name:'sensibilidad',
        value:'Normal'
      },
      {
        titulo:'Propiocepción',
        name:'propiocepcion',
        value:'Normal'
      },
      {
        titulo:'Nivel de conciencia',
        name:'conciencia',
        line:'Valoración Componentes Cognitivos',
        value:'Normal'
      },
      {
        titulo:'Atención',
        name:'atencion',
        value:'Normal'
      } ,
      {
        titulo:'Memoria',
        name:'memoria',
        value:'Normal'
      },
      {
        titulo:'Orientación',
        name:'orientacion',
        value:'Normal'
      },
      {
        titulo:'Esquema corporal',
        name:'esquema',
        value:'Normal'
      },
      {
        titulo:'Afasia',
        name:'afasia',
        value:'Normal'
      },
      {
        titulo:'Apraxia',
        name:'apraxia',
        value:'Normal'
      },
      {
        titulo:'Agnosia',
        name:'agnosia',
        value:'Normal'
      } ,
      {
        titulo:'Funciones ejecutivas',
        name:'funciones',
        value:'Normal'
      },
      {
        titulo:'Intereses',
        line:'Componentes Psicosociales',
        name:'interes',
        value:'Normal'
      },
      {
        titulo:'Autocontrol / Ansiedad',
        name:'autocontrol',
        value:'Normal'
      },
      {
        titulo:'Habilidades sociales',
        name:'habilidades',
        value:'Normal'
      },
      {
        titulo:'Problemas conductuales',
        name:'problemas',
        value:'Normal'
      },
      {
        titulo:'Estado de ánimo',
        name:'estado',
        value:'Normal'
      }
    ];

    this.id = this.actiRoute.snapshot.paramMap.get('id');
    
  /* traer la informacion del paciente con el id obtenido por la cedula en la consulta anterior */
    this.consultaService.pacienteporID(this.id).subscribe((resp: any) => {
      
      
      this.infoPaciente = resp.resultados;

    });
    /* creo la fecha actual con la cual el registro es guardado */
    this.fecha = formatDate(new Date(), 'YYYY-MM-dd, h:mm:ss a', 'en');


   
  }

  procesaPropagar(recibo:any) {

    this.recibo = recibo;
  
    }


  terapiaOcu() {

    this.formSubmitted = true;
  
   
  
    if ( this.terapiaForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }


    if (this.recibo === undefined) {
      /* normal  */
      this.terapiaForm.value.tolerancia = 'Normal';
      this.terapiaForm.value.deformidades = 'Normal';
      this.terapiaForm.value.edema = 'Normal';
      this.terapiaForm.value.rangoA = 'Normal';
      this.terapiaForm.value.fuerzaM = 'Normal';
      this.terapiaForm.value.reacciones = 'Normal';
      this.terapiaForm.value.control = 'Normal';
      this.terapiaForm.value.marcha = 'Normal';
      this.terapiaForm.value.coordinacion = 'Normal';
      this.terapiaForm.value.destreza = 'Normal';
      this.terapiaForm.value.vista = 'Normal';
      this.terapiaForm.value.oido = 'Normal'; 
  
      this.terapiaForm.value.sensibilidad = 'Normal';
      this.terapiaForm.value.propiocepcion = 'Normal';
      this.terapiaForm.value.conciencia = 'Normal';
      this.terapiaForm.value.atencion = 'Normal';
      this.terapiaForm.value.memoria = 'Normal';
      this.terapiaForm.value.orientacion = 'Normal';
      this.terapiaForm.value.esquema = 'Normal';
      this.terapiaForm.value.afasia = 'Normal';
      this.terapiaForm.value.apraxia = 'Normal';
      this.terapiaForm.value.agnosia = 'Normal';

      this.terapiaForm.value.funciones = 'Normal';
      this.terapiaForm.value.interes = 'Normal';
      this.terapiaForm.value.autocontrol = 'Normal';
      this.terapiaForm.value.habilidades = 'Normal';
      this.terapiaForm.value.problemas = 'Normal';
      this.terapiaForm.value.estado = 'Normal';


    } else {

      this.terapiaForm.value.tolerancia = this.recibo[0].value;
      this.terapiaForm.value.deformidades = this.recibo[1].value;
      this.terapiaForm.value.edema = this.recibo[2].value;
      this.terapiaForm.value.rangoA = this.recibo[3].value;
      this.terapiaForm.value.fuerzaM = this.recibo[4].value;
      this.terapiaForm.value.reacciones = this.recibo[5].value;
      this.terapiaForm.value.control = this.recibo[6].value;
      this.terapiaForm.value.marcha = this.recibo[7].value;
      this.terapiaForm.value.coordinacion = this.recibo[8].value;
      this.terapiaForm.value.destreza = this.recibo[9].value;
      this.terapiaForm.value.vista = this.recibo[10].value;
      this.terapiaForm.value.oido = this.recibo[11].value; 
  
      this.terapiaForm.value.sensibilidad = this.recibo[12].value;
      this.terapiaForm.value.propiocepcion = this.recibo[13].value;
      this.terapiaForm.value.conciencia = this.recibo[14].value;
      this.terapiaForm.value.atencion = this.recibo[15].value;
      this.terapiaForm.value.memoria = this.recibo[16].value;
      this.terapiaForm.value.orientacion = this.recibo[17].value;
      this.terapiaForm.value.esquema = this.recibo[18].value;
      this.terapiaForm.value.afasia = this.recibo[19].value;
      this.terapiaForm.value.apraxia = this.recibo[20].value;
      this.terapiaForm.value.agnosia = this.recibo[21].value;

      this.terapiaForm.value.funciones = this.recibo[22].value;
      this.terapiaForm.value.interes = this.recibo[23].value;
      this.terapiaForm.value.autocontrol = this.recibo[24].value;
      this.terapiaForm.value.habilidades = this.recibo[25].value;
      this.terapiaForm.value.problemas = this.recibo[26].value;
      this.terapiaForm.value.estado = this.recibo[27].value;


    }
  
    this.terapiaForm.value.paciente = this.id;
    this.terapiaForm.value.fecha = this.fecha;
  
  
    /* llamo al servicio de registro de formularios */
  
    this.consultaService.terapiaO(this.terapiaForm.value).subscribe((resp: any) => {
  
      // console.log(resp);
        
    });
  
    Swal.fire('' , 'Terapia Ocupacional De Paciente registrado exitosamente', 'success').then((result) => {
      if (result.value) {
    
       
        this.router.navigate(['/consultaP']);
      }
    });
  
   }





}
