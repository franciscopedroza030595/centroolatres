import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-registropacientes',
  templateUrl: './registropacientes.component.html',
  styleUrls: ['./registropacientes.component.scss']
})
export class RegistropacientesComponent implements OnInit {


  public nameObj = {
    nombreU: '',
    apellidoU: '',
    cargo: ''
  }

  
  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

        this.usuarioService.obtenerInfoUsuario().subscribe( (resp: any) => {
          console.log(resp);
          this.nameObj.nombreU = resp.resultados[0].nombre;
          this.nameObj.apellidoU = resp.resultados[0].apellido;
          this.nameObj.cargo = resp.resultados[0].profesion;
          
          localStorage.setItem('nameObj', JSON.stringify(this.nameObj));
        });


  }


  pacientes() {
    
    this.router.navigate(['/datospersonales']);

  }

  parejas() {
  
    this.router.navigate(['/datospareja']);
    

  }

  
}
