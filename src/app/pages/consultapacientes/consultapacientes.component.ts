import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-consultapacientes',
  templateUrl: './consultapacientes.component.html',
  styleUrls: ['./consultapacientes.component.scss']
})
export class ConsultapacientesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }



  historiaA(){

    this.router.navigate(['/historiaA']);

  }

  parejas(){

  }

  derivacion(){

  }

  remision(){
    
  }

}
