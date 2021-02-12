import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2';

import {formatDate} from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

import { ConsultasService } from '../../services/consultas.service';



@Component({
  selector: 'app-solicitudhc',
  templateUrl: './solicitudhc.component.html',
  styleUrls: ['./solicitudhc.component.scss']
})
export class SolicitudhcComponent implements OnInit {

  fecha: any;
  idpaciente = false;
  nameP = '';

  public formSubmitted = false;

  solicitudForm:FormGroup;

  
  constructor(private consultaService: ConsultasService, private fb: FormBuilder, private actiRoute: ActivatedRoute, private router: Router) {

    this.solicitudForm = this.fb.group({
      motivo: ['', Validators.required ],
      nombre: ['', Validators.required ],
      parentesco: ['', Validators.required ],
      identificacion: ['', Validators.required ],
      
      cedulaP: [''],
      fecha:[],
      paciente:[]
     
      
    });
  
   }

  ngOnInit(): void {

     /* creo la fecha actual con la cual el registro es guardado */
     this.fecha = formatDate(new Date(), 'YYYY-MM-dd, h:mm:ss a', 'en');
     
  }

  /* metodo buscar paciente */
  search(){


    this.consultaService.obtenerPaciente(this.solicitudForm.value.cedulaP).subscribe((resp: any) => {
      
      console.log(resp.resultados);

      if(resp.resultados !== null) {

        this.nameP = resp.resultados.nombreyapellido;

        this.solicitudForm.value.paciente = resp.resultados.uid;

        this.idpaciente =true;

      }else {
        Swal.fire('' , 'Paciente No Existente, por favor registre el paciente primero', 'error').then((result) => {
          if (result.value) {
      
          
          }
        });
      }


    });

    
  }

  solicitud(){

    this.formSubmitted = true;


    if ( this.solicitudForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }

    this.solicitudForm.value.fecha = this.fecha;

    console.log(this.solicitudForm.value);


    this.consultaService.solicitudhc(this.solicitudForm.value).subscribe((resp: any) => {

      console.log(resp);
        
    });
  
    Swal.fire('' , 'Solicitud registrada exitosamente', 'success').then((result) => {
      if (result.value) {
    
       
        this.router.navigate(['/home']); 
      }
    });


  }

}
