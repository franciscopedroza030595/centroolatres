import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-terapiaparejas',
  templateUrl: './terapiaparejas.component.html',
  styleUrls: ['./terapiaparejas.component.scss']
})
export class TerapiaparejasComponent implements OnInit {

  

  public formSubmitted = false;

  parejaForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      observaciones: ['', Validators.required ]

    });

   }

  ngOnInit(): void {


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
      observaciones: ['', Validators.required ]

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
    console.log(this.parejaForm.value);
  
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
