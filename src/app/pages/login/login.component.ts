import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inicio = false;


  nameObj = {
    nombreU: '',
    apellidoU: '',
    role: ''
  }

  

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required],
    remember: [true]
  });

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {

    

    if (localStorage.getItem('nameObj')) {
      this.nameObj = JSON.parse(localStorage.getItem('nameObj') || '{}'); 
    }
   }

  ngOnInit(): void {

   

    this.usuarioService.validarToken().subscribe((res: any) => {
   
      if (res === false ) {
        /* pedir que haga loguin o creee cuenta para obtener token de local storage */
        
        Swal.fire('', 'Por favor inicie sesion', 'error' );

        
      } else {
       
        this.usuarioService.obtenerInfoUsuario().subscribe( (resp: any) => {
          console.log(resp);
          this.nameObj.nombreU = resp.resultados[0].nombre;
          this.nameObj.apellidoU = resp.resultados[0].apellido;
          this.nameObj.role = resp.resultados[0].role;
          
          localStorage.setItem('nameObj', JSON.stringify(this.nameObj));
        });
        this.inicio = true; 
        
      }
    });

      

  }


  // ==========================================================================================
  login() {
    console.log(this.loginForm.value);
    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        if ( this.loginForm.get('remember').value){ 
          localStorage.setItem('email', this.loginForm.get('email').value ); 
        } else {
          localStorage.removeItem('email');
        }
        this.usuarioService.obtenerInfoUsuario().subscribe( (resp: any) => {
          console.log(resp);
          this.nameObj.nombreU = resp.resultados[0].nombre;
          this.nameObj.apellidoU = resp.resultados[0].apellido;
          this.nameObj.role = resp.resultados[0].role;
          
          localStorage.setItem('nameObj', JSON.stringify(this.nameObj));
        });
       
        Swal.fire('', 'Inicio de sesion exitosa', 'success'); 

        this.inicio = true;
        
      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error' );
      });

  }


  /* ------------------------- */



}
