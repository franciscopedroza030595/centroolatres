import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';

import { ConsultasService } from '../../services/consultas.service';

import {formatDate} from '@angular/common';

@Component({
  selector: 'app-terapiaparejas',
  templateUrl: './terapiaparejas.component.html',
  styleUrls: ['./terapiaparejas.component.scss']
})
export class TerapiaparejasComponent implements OnInit {

  id: any;
  infoPareja: any;
  fecha: any;

  public formSubmitted = false;

  parejaForm: FormGroup;

  constructor(private fb: FormBuilder, private consultaService: ConsultasService, private actiRoute: ActivatedRoute, private router: Router) {

    this.parejaForm = this.fb.group({
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
      historiap: ['', Validators.required ],
      relacionesa: ['', Validators.required ],
      opinion: ['', Validators.required ],
      objetivos: ['', Validators.required ],
      proximas: ['', Validators.required ],
      observaciones: ['', Validators.required ],
      pareja: [''],
      fecha:[]

    });

   }

  ngOnInit(): void {


    this.id = this.actiRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    
    /* traer la informacion de pareja con el id obtenido por la cedula en la consulta anterior */
    this.consultaService.parejaporID(this.id).subscribe((resp: any) => {
      
      
      this.infoPareja = resp.resultados;
      console.log(this.infoPareja);

    });

    /* creo la fecha actual con la cual el registro es guardado */
    this.fecha = formatDate(new Date(), 'YYYY-MM-dd', 'en');


    this.parejaForm = this.fb.group({
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
      historiap: ['', Validators.required ],
      relacionesa: ['', Validators.required ],
      opinion: ['', Validators.required ],
      objetivos: ['', Validators.required ],
      proximas: ['', Validators.required ],
      observaciones: ['', Validators.required ],
      pareja: [''],
      fecha:[]

    });
  }

  get caracteristicaf() {
    return this.parejaForm.get('caracteristicaf') as FormArray;
  }


  historiapareja() {

    this.formSubmitted = true;

    if ( this.parejaForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }

    this.parejaForm.value.pareja = this.id;
    this.parejaForm.value.fecha = this.fecha;

    console.log(this.parejaForm.value);



    /* llamo al servicio de registro de formularios */

  this.consultaService.terapiaP(this.parejaForm.value).subscribe((resp: any) => {

    console.log(resp);
      
  });

  Swal.fire('' , 'Terapia De Pareja registrada exitosamente', 'success').then((result) => {
    if (result.value) {
  
     
      this.router.navigate(['/consultaP']);
    }
  });
  
   }

   addF() {
    console.log('yeah');

    this.formSubmitted = true;

    console.log(this.parejaForm.value);

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

  deleteF(index:any) {
    this.caracteristicaf.removeAt(index);
  }



  

}
