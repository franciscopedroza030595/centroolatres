import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators } from '@angular/forms';

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


  public solicitudForm = this.fb.group({
    motivo: ['', Validators.required ],
    nombre: ['', Validators.required ],
    parestesco: ['', Validators.required ],
    identificacion: ['', Validators.required ],
    entrega: ['', Validators.required ],
    firmaS: ['', Validators.required],
    fecha:[]
   
    
  });

  constructor(private consultaService: ConsultasService, private fb: FormBuilder, private actiRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }



  solicitud(){


  }

}
