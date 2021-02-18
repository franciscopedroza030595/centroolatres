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
    cargo: ''
  }


  public formSubmitted = false;



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

  
       
        this.usuarioService.obtenerInfoUsuario().subscribe( (resp: any) => {

          if (resp !== null) {

          this.nameObj.nombreU = resp.resultados[0].nombre;
          this.nameObj.apellidoU = resp.resultados[0].apellido;
          this.nameObj.cargo = resp.resultados[0].profesion;
          
          localStorage.setItem('nameObj', JSON.stringify(this.nameObj));

          this.inicio = true; 
        }
        });
        
        
      
   
      

  }


  // ==========================================================================================
  login() {

    this.formSubmitted = true;

    

    if ( this.loginForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }
    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        if ( this.loginForm.value.remember){ 
          localStorage.setItem('email', this.loginForm.value.email ); 
        } else {
          localStorage.removeItem('email');
        }
        this.usuarioService.obtenerInfoUsuario().subscribe( (resp: any) => {
          this.nameObj.nombreU = resp.resultados[0].nombre;
          this.nameObj.apellidoU = resp.resultados[0].apellido;
          this.nameObj.cargo = resp.resultados[0].profesion;
          
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
