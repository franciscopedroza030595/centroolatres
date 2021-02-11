import { Component, OnInit, Input } from '@angular/core';

import {  FormBuilder, Validators, FormGroup } from '@angular/forms';



import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { ConsultasService } from '../../services/consultas.service';

import {formatDate} from '@angular/common';

@Component({
  selector: 'app-psiquiatrica',
  templateUrl: './psiquiatrica.component.html',
  styleUrls: ['./psiquiatrica.component.scss']
})
export class PsiquiatricaComponent implements OnInit {

  id: any;
  infoPaciente: any;
  fecha: any;

  public formSubmitted = false;
  psiquiForm:FormGroup;

  check = true;

  /* para radio buttons */
  data1: any[] =[];

  recibo: any;



  constructor(private consultaService: ConsultasService, private fb: FormBuilder, private actiRoute: ActivatedRoute, private router: Router) { 

    // terapiaFrom
 
    this.psiquiForm = this.fb.group({
      motivo: ['', Validators.required ],
      padecimiento: ['', Validators.required ],
      heredofamiliares: ['', Validators.required ],
      antecedentesPerso: ['',  Validators.required],
      antecedentesPato: ['',  Validators.required],
      circuncision: ['',  Validators.required],
      criptorquidia: ['',  Validators.required],
      polucionesNoctu: ['',  Validators.required],
      ivsa: ['',  ], 
      parejas: ['' ],
      ets: ['',  ],
      AntecendesFami: ['',  Validators.required],
      AntecendesEsco: ['', Validators.required ],
      historiaPiscoSex: ['',  Validators.required],
      historiaOcupa: ['',  Validators.required],
      tiempoL: ['',  Validators.required],
      sintomas: ['' ],
      respiratorio: ['' ],
      cardiovascu: ['' ],
      digestivo: ['' ],
      renal: ['' ],
      genital: ['' ],
      endocrino: ['' ],
      hematopoyetico: [ ''],
      piel: ['' ],
      musculoEsque: [ ''],
      nervioso: [ ''],
      organosS: ['' ],
      presion: ['',  ],
      frecuencia: ['',  ],
      frecuenciaC: ['',  ],
      temperatura: ['',  ],
      peso:[, Validators.required],
      talla:[, Validators.required],
      imc:[],
      craneo: [''],
      ojos: [ ''],
      oidos: ['' ],
      nariz: ['' ],
      boca: [ ''],
      cuello: [''],
      torax: [''],
      abdomen: [''],
      extremidades: [''],
      neurologica: [''],
      mental: ['', Validators.required ],
      diagnosticos: ['',  Validators.required],
    

      paciente: [''],
      fecha:[]
      
        
      
    });


    

  }

  


  ngOnInit(): void {

  
    /* ---------- */

    this.data1 = [
      
      {
        titulo:'Síntomas Generales',
        name:'sintomas',
        line:'Interrogatorio Por Aparatos Y Sistemas',
        value:'Normal'
      },
      {
        titulo:'Aparato Respiratorio',
        name:'respiratorio',
        value:'Normal'
      },
      {
        titulo:'Aparato Cardiovascular ',
        name:'cardiovascu',
        value:'Normal'
      }
      ,
      {
        titulo:'Aparato Digestivo ',
        name:'digestivo',
        value:'Normal'
      }
      ,
      {
        titulo:'Aparato Renal Y Urinario ',
        name:'renal',
        value:'Normal'
      }
      ,
      {
        titulo:'Aparato Genital ',
        name:'genital',
        value:'Normal'
      }
      ,
      {
        titulo:'Sistema Endocrino ',
        name:'endocrino',
        value:'Normal'
      }
      ,
      {
        titulo:'Sistema Hematopoyético y linfático ',
        name:'hematopoyetico',
        value:'Normal'
      },
      {
        titulo:'Piel Y Anexos ',
        name:'piel',
        value:'Normal'
      },
      {
        titulo:'Musculoesquelético ',
        name:'musculoEsque',
        value:'Normal'
      },
      {
        titulo:'Sistema Nerviso ',
        name:'nervioso',
        value:'Normal'
      },
      {
        titulo:'Óganos De Los Sentidos ',
        name:'organosS',
        value:'Normal'
      },
      

      {
        titulo:'Cráneo',
        name:'craneo',
        line:'Exploración Física Y Neurológica',
        value:'Normal'
      },
      {
        titulo:'Ojos',
        name:'ojos',
        value:'Normal'
      },
      {
        titulo:'Oídos',
        name:'oidos',
        value:'Normal'
      },
      {
        titulo:'Nariz Y Senos Paranasales',
        name:'nariz',
        value:'Normal'
      },
      {
        titulo:'Boca',
        name:'boca',
        value:'Normal'
      } ,
      {
        titulo:'Cuello',
        name:'cuello',
        value:'Normal'
      },
      {
        titulo:'Tórax',
        name:'torax',
        value:'Normal'
      },
      {
        titulo:'Abdomen',
        name:'abdomen',
        value:'Normal'
      },
      {
        titulo:'Extremidades Superiores e Inferiores',
        name:'extremidades',
        value:'Normal'
      },
      {
        titulo:'Exploración Neurológica',
        name:'neurologica',
        value:'Normal'
      } 
    ];

 


    this.id = this.actiRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    
  /* traer la informacion del paciente con el id obtenido por la cedula en la consulta anterior */
    this.consultaService.pacienteporID(this.id).subscribe((resp: any) => {
      
      
      this.infoPaciente = resp.resultados;
      console.log(this.infoPaciente);

    });
    /* creo la fecha actual con la cual el registro es guardado */
    this.fecha = formatDate(new Date(), 'YYYY-MM-dd, h:mm:ss a', 'en');

  }

  procesaPropagar(recibo:any) {

  this.recibo = recibo;

  }

  

  psiqui() { 




    this.formSubmitted = true;
  
   
  
    if ( this.psiquiForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }
  

    if (this.recibo === undefined) {
      /* normal  */
    this.psiquiForm.value.sintomas = 'Normal';
    this.psiquiForm.value.respiratorio = 'Normal';
    this.psiquiForm.value.cardiovascu = 'Normal';
    this.psiquiForm.value.digestivo = 'Normal';
    this.psiquiForm.value.renal = 'Normal';
    this.psiquiForm.value.genital = 'Normal';
    this.psiquiForm.value.endocrino = 'Normal';
    this.psiquiForm.value.hematopoyetico = 'Normal';
    this.psiquiForm.value.piel = 'Normal';
    this.psiquiForm.value.musculoEsque = 'Normal';
    this.psiquiForm.value.nervioso = 'Normal';
    this.psiquiForm.value.organosS = 'Normal'; 

    this.psiquiForm.value.craneo = 'Normal';
    this.psiquiForm.value.ojos = 'Normal';
    this.psiquiForm.value.oidos = 'Normal';
    this.psiquiForm.value.nariz = 'Normal';
    this.psiquiForm.value.boca = 'Normal';
    this.psiquiForm.value.cuello = 'Normal';
    this.psiquiForm.value.torax = 'Normal';
    this.psiquiForm.value.abdomen = 'Normal';
    this.psiquiForm.value.extremidades = 'Normal';
    this.psiquiForm.value.neurologica = 'Normal';

  } else {
   
    this.psiquiForm.value.sintomas = this.recibo[0].value;
    this.psiquiForm.value.respiratorio = this.recibo[1].value;
    this.psiquiForm.value.cardiovascu = this.recibo[2].value;
    this.psiquiForm.value.digestivo = this.recibo[3].value;
    this.psiquiForm.value.renal = this.recibo[4].value;
    this.psiquiForm.value.genital = this.recibo[5].value;
    this.psiquiForm.value.endocrino = this.recibo[6].value;
    this.psiquiForm.value.hematopoyetico = this.recibo[7].value;
    this.psiquiForm.value.piel = this.recibo[8].value;
    this.psiquiForm.value.musculoEsque = this.recibo[9].value;
    this.psiquiForm.value.nervioso = this.recibo[10].value;
    this.psiquiForm.value.organosS = this.recibo[11].value; 

    this.psiquiForm.value.craneo = this.recibo[12].value;
    this.psiquiForm.value.ojos = this.recibo[13].value;
    this.psiquiForm.value.oidos = this.recibo[14].value;
    this.psiquiForm.value.nariz = this.recibo[15].value;
    this.psiquiForm.value.boca = this.recibo[16].value;
    this.psiquiForm.value.cuello = this.recibo[17].value;
    this.psiquiForm.value.torax = this.recibo[18].value;
    this.psiquiForm.value.abdomen = this.recibo[19].value;
    this.psiquiForm.value.extremidades = this.recibo[20].value;
    this.psiquiForm.value.neurologica = this.recibo[21].value;
  }

    
    
  
    this.psiquiForm.value.paciente = this.id;
    this.psiquiForm.value.fecha = this.fecha;

     /* RECORDAR CALCULAR IMC PRIMERO */

     this.psiquiForm.value.imc = (this.psiquiForm.value.peso/(this.psiquiForm.value.talla)**2);
  
    console.log(this.psiquiForm.value);
 


    /* llamo al servicio de registro de formularios */
  
    this.consultaService.psiqui(this.psiquiForm.value).subscribe((resp: any) => {
  
      console.log(resp);
        
    });
  
    Swal.fire('' , 'Historia Psiquiatrica De Paciente registrado exitosamente', 'success').then((result) => {
      if (result.value) {
    
       
        this.router.navigate(['/consultaP']);
      }
    });
  
   }


}
