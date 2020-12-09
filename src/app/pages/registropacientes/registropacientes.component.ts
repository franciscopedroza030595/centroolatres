import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registropacientes',
  templateUrl: './registropacientes.component.html',
  styleUrls: ['./registropacientes.component.scss']
})
export class RegistropacientesComponent implements OnInit {

tipohi = '';


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  historiaA() {
    this.tipohi = 'historiaA';
    this.router.navigate(['/datospersonales', this.tipohi]);

  }

  parejas() {
  
    this.router.navigate(['/datospareja']);
    

  }

  derivacion() {
    this.tipohi = 'derivacion';

    this.router.navigate(['/datospersonales', this.tipohi]);

  }

  remision() {

    this.tipohi = 'remision';
    this.router.navigate(['/datospersonales', this.tipohi]);

  }

}
