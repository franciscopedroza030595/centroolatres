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
  
  fechaN: String[] = [];

  id: any;
  seccionesA = 0;
  secccionN = 0;


  fechaProx = false;

  secciones = false;

  infoPa: any;

  pareja = false;

  infoSeguimientos: any;

  segui = false;

  

  nombreP = 'pacho'; // para pdf ver despues!!!
  

  public seguiForm = this.fb.group({
    descripcion: ['', Validators.required ],
    situaciones: ['', Validators.required ],
    progreso: ['', Validators.required ],
    acuerdos: ['', Validators.required ],
    observaciones: ['', Validators.required ],
    ultima:['', Validators.required],
    paciente: [''],
    pareja: [''],
    fechaS:[],
    fecha:[]
   
    
  });

  datePickerConfig = {
    firstDayOfWeek: 'mo',
    drops: 'up',
    format: 'YYYY-MM-DD HH:mm',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: true,
    locale:'es',
    hours12Format: 'hh',
    hours24Format: 'HH',
    meridiemFormat: 'A',
    minutesFormat: 'mm',
    minutesInterval: 1,
    secondsFormat: 'ss',
    secondsInterval: 1,
    showSeconds: false,
    showTwentyFourHours: true,
    timeSeparator: ':',
    showGoToCurrent: true
  }


 
  constructor(private consultaService: ConsultasService, private fb: FormBuilder, private actiRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.id = this.actiRoute.snapshot.paramMap.get('id');
   
    
    this.consultaService.pacienteporID(this.id).subscribe((resp: any) => {
      if(resp !== null){
      this.infoPa = resp.resultados;
      this.pareja = false;

      this.fechaN[0] = formatDate(new Date(this.infoPa.fechanacimiento), 'YYYY-MM-dd', 'en');

      
    } 
    
    });
    
    this.consultaService.parejaporID(this.id).subscribe((resp: any) => {
      if(resp !== null){
      this.infoPa = resp.resultados;
      
      this.pareja = true;

      this.fechaN[0] = formatDate(new Date(this.infoPa.fechanacimiento), 'YYYY-MM-dd', 'en');
      this.fechaN[1] = formatDate(new Date(this.infoPa.fechanacimiento2), 'YYYY-MM-dd', 'en');
      
      }
    });

    this.consultaService.seguimientoID(this.id).subscribe((res: any) => {

      this.infoSeguimientos = res.resultados;
      
   
      this.seccionesA = this.infoSeguimientos.length;
      this.secccionN = this.seccionesA + 1;   
    
    });

        /* creo la fecha actual con la cual el registro es guardado */
        this.fecha = formatDate(new Date(), 'YYYY-MM-dd, h:mm:ss a', 'en');
        
        


     /* prueba de pdf */
    /* const documento = new jsPDF();
    documento.text('Hola mundo!', 10, 10); // "Texto" , horizontal, vertical
    documento.save('hello.pdf');
     */



     /* -------------------- */
  }

  ultimaNo() {

    this.fechaProx = true;
  }
  ultimaSi() {

    this.fechaProx = false;
  }


  seguimiento() {

    let texto;

    this.formSubmitted = true;
    if ( this.seguiForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }

    if (this.pareja = true) {
      texto = 'Pareja';
      

    } else {
      texto = 'Paciente';
      
    }
    this.seguiForm.value.pareja = this.id;
    this.seguiForm.value.paciente = this.id;
    this.seguiForm.value.fecha = this.fecha;


    

    this.consultaService.seguimientoPa(this.seguiForm.value).subscribe((resp: any) => {

      
        
    });

    

    Swal.fire('' , 'Seguimiento De ' + texto +  ' registrado exitosamente', 'success').then((result) => {
      if (result.value) {

        let  object: any ={
          fecha: this.fecha,
          nombreP: this.infoPa.nombreyapellido,
          cedulaP: this.infoPa.cedula,
          edadP: this.infoPa.edad,
          proximaS: this.seguiForm.value.fechaS,
          progreso: this.seguiForm.value.progreso,
          acuerdos:  this.seguiForm.value.acuerdos
          }
        // this.router.navigate(['/consultaP']);
        localStorage.setItem('dataSeguimiento', JSON.stringify(object));
        this.router.navigate(['/pdfseguimiento']);
      }
    });

    
    

  }


  verSecciones(){

    this.segui = true;
  }

  volver(){

    this.segui = false;
  }

  visualizarSeguim(id:any) {

    const tipo = 'segui'
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
