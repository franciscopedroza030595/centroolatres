import { Component, OnInit } from '@angular/core';

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


  constructor(private consultaService: ConsultasService, private fb: FormBuilder, private actiRoute: ActivatedRoute, private router: Router) { 

    // terapiaFrom
 
    this.psiquiForm = this.fb.group({
      motivo: ['', Validators.required ],
      padecimiento: ['', Validators.required ],
      heredofamiliares: ['', Validators.required ],
      antecedentesPerso: ['', Validators.required ],
      antecedentesPato: ['', Validators.required ],
      circuncision: ['', Validators.required ],
      criptorquidia: ['', Validators.required ],
      polucionesNoctu: ['', Validators.required ],
      ivsa: ['', Validators.required ],
      parejas: [''],
      ets: ['', Validators.required ],
      AntecendesFami: ['', Validators.required ],
      AntecendesEsco: ['', Validators.required ],
      historiaPiscoSex: ['', Validators.required ],
      historiaOcupa: ['', Validators.required ],
      tiempoL: ['', Validators.required ],
      sintomas: ['', Validators.required ],
      respiratorio: ['', Validators.required ],
      cardiovascu: ['', Validators.required ],
      digestivo: ['', Validators.required ],
      renal: ['', Validators.required ],
      genital: ['', Validators.required ],
      endocrino: ['', Validators.required ],
      hematopoyetico: ['', Validators.required ],
      piel: ['', Validators.required ],
      musculoEsque: ['', Validators.required ],
      nervioso: ['', Validators.required ],
      organosS: ['', Validators.required ],
      presion: ['', Validators.required ],
      frecuencia: ['', Validators.required ],
      frecuenciaC: ['', Validators.required ],
      temperatura: ['', Validators.required ],
      peso:[],
      talla:[],
      imc:[],
      craneo: ['', Validators.required ],
      ojos: ['', Validators.required ],
      oidos: ['', Validators.required ],
      nariz: ['', Validators.required ],
      boca: ['', Validators.required ],
      cuello: ['', Validators.required ],
      torax: ['', Validators.required ],
      abdomen: ['', Validators.required ],
      extremidades: ['', Validators.required ],
      neurologica: ['', Validators.required ],
      mental: ['', Validators.required ],
      diagnosticos: ['', Validators.required ],
    

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

  }


  psiqui() {

    this.formSubmitted = true;
  
   
  
    if ( this.psiquiForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
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
  
    Swal.fire('' , 'Terapia Ocupacional De Paciente registrado exitosamente', 'success').then((result) => {
      if (result.value) {
    
       
        this.router.navigate(['/consultaP']);
      }
    });
  
   }


}
