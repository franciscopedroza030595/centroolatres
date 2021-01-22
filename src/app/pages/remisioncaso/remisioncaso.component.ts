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

  /* para ver secciones anteriores */
  seccionesA = 0;

  secciones = false;

  infoRemision: any;

  infoSeguimientos: any;

  infoPa: any;

  pareja = false;

  segui = false;

  remi = false; 


  public formSubmitted = false;
  

  public remiForm = this.fb.group({
    descripcion: ['', Validators.required ],
    evaluacion: ['', Validators.required ],
    diagnostica: ['', Validators.required ],
    cod: ['', Validators.required ],
    seguimiento: ['', Validators.required ],
    medicoentidad: ['', Validators.required ],
    observaciones: ['', Validators.required ],
    ultima:['', Validators.required],
    paciente: [''],
    pareja: [''],
    fecha:[]
   
   
    
  });


  constructor(private consultaService: ConsultasService, private fb: FormBuilder, private actiRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.id = this.actiRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    this.consultaService.pacienteporID(this.id).subscribe((resp: any) => {
      if(resp !== null){
      this.infoPa = resp.resultados;
      this.pareja = false;
      
    } 
    
    });
    
    this.consultaService.parejaporID(this.id).subscribe((resp: any) => {
      if(resp !== null){
      this.infoPa = resp.resultados;
      
      this.pareja = true;
      
      }
    });


    this.consultaService.seguimientoID(this.id).subscribe((res: any) => {

      this.infoSeguimientos = res.resultados;
      console.log(this.infoSeguimientos);
      this.seccionesA = this.infoSeguimientos.length;
      
    
    });

    this.consultaService.remisionID(this.id).subscribe((res: any) => {

      this.infoRemision = res.resultados;
      console.log(this.infoRemision);
      this.remisionesA = this.infoRemision.length;
      this.remisionN = this.remisionesA + 1;
      
    
    });

     /* creo la fecha actual con la cual el registro es guardado */
     this.fecha = formatDate(new Date(), 'YYYY-MM-dd, h:mm:ss a', 'en');


  }


  remision() {

    let texto;

    this.formSubmitted = true;
    if ( this.remiForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }

    if (this.pareja = true) {
      texto = 'Pareja';
      

    } else {
      texto = 'Paciente';
      
    }


    this.remiForm.value.paciente = this.id;
    this.remiForm.value.pareja = this.id;
    this.remiForm.value.fecha = this.fecha;
    // Realizar el posteo mediante el servicio
    
    console.log(this.remiForm.value);

    this.consultaService.remisionPa(this.remiForm.value).subscribe((resp: any) => {

      console.log(resp);
        
    });

    Swal.fire('' , 'Remision De ' + texto +  ' registrado exitosamente', 'success').then((result) => {
      if (result.value) {
    
       
        this.router.navigate(['/consultaP']);
      }
    });
    

  }

  verSecciones(){

    this.segui = true;
    
  }

  verRemisiones(){

  
    this.remi = true;

  }

  volver(){

    this.segui = false;
    this.remi = false;
  }

  visualizarSeguim(id:any, tipo:String) {

    let pareja = ''
    if(this.pareja === true) {
       pareja = 'pareja';
    } else {
       pareja = 'no';
    }

    

    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/visualziarS/${id}/${tipo}/${pareja}`])
    );

    this.router.navigate([]).then(result => {  window.open(url, '_blank') });
  }


}
