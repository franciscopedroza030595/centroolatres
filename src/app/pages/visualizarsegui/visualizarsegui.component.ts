import { Component, OnInit } from '@angular/core';

import {formatDate} from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-visualizarsegui',
  templateUrl: './visualizarsegui.component.html',
  styleUrls: ['./visualizarsegui.component.scss']
})
export class VisualizarseguiComponent implements OnInit {

  

  infoSeguimiento: any;
 

  remision = false;

  

  constructor(private consultaService: ConsultasService, private actiRoute: ActivatedRoute) { }

  async ngOnInit() {

    const id = this.actiRoute.snapshot.paramMap.get('id');
    console.log(id);

    const tipo = this.actiRoute.snapshot.paramMap.get('tipo');
    console.log(tipo);

    if(tipo ===  'segui') {

    this.consultaService.seguimiento(id).subscribe((res: any) => {

      this.infoSeguimiento = res.resultados;
      console.log(this.infoSeguimiento);
      
    
    });

    /* cuando es remision */
  } else {

    this.remision = true
    console.log(this.remision);

    this.consultaService.remision(id).subscribe((res: any) => {

      this.infoSeguimiento = res.resultados;
      console.log(this.infoSeguimiento);
      
    
    });


  }


  }

  /* metodo para imprimir una seccion en pdf preguntar o  como se imprime todo */

}
