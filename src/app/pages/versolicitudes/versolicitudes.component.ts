import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-versolicitudes',
  templateUrl: './versolicitudes.component.html',
  styleUrls: ['./versolicitudes.component.scss']
})
export class VersolicitudesComponent implements OnInit {


  infoSolicitudes: any;

  constructor(private consultaService: ConsultasService, private actiRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.consultaService.getsolicitudhc().subscribe((resp: any) => {

      this.infoSolicitudes = resp.solicitudhc;
      
    });


  }

  imprimirSoli(id:any){

  }

}
