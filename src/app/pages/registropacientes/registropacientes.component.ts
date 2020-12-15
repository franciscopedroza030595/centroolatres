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
    role: ''
  }

  
  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.usuarioService.validarToken().subscribe((res: any) => {
   
      if (res === false ) {
        /* pedir que haga loguin o creee cuenta para obtener token de local storage */
        
        Swal.fire('', 'Por favor inicie sesion', 'error' );
        
        this.router.navigate(['/home']);
        
      } else {

        this.usuarioService.obtenerInfoUsuario().subscribe( (resp: any) => {
          console.log(resp);
          this.nameObj.nombreU = resp.resultados[0].nombre;
          this.nameObj.apellidoU = resp.resultados[0].apellido;
          this.nameObj.role = resp.resultados[0].role;
          
          localStorage.setItem('nameObj', JSON.stringify(this.nameObj));
        });



        
      }
    });


  }


  pacientes() {
    
    this.router.navigate(['/datospersonales']);

  }

  parejas() {
  
    this.router.navigate(['/datospareja']);
    

  }

  
}
