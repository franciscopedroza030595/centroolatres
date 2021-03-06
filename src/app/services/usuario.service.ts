import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

import { LoginForm } from '../interfaces/login.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }



    /* ----------------------- */

    validarToken(): Observable<boolean> {
      const token = localStorage.getItem('token') || '';
  
      return this.http.get(`${ base_url }/login/renew`, {
        headers: {
          'x-token': token
        }
      }).pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token );
        }),
        map( resp => true),
        catchError( error => of(false) )
      );
  
    }

    /* --------------------------------------------- */

    login( formData: LoginForm ) {

      return this.http.post(`${ base_url }/login` , formData).pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token );
        })
      );
  
    }

    /* ------------------------------------------------- */

    obtenerInfoUsuario() {

      const email = localStorage.getItem('email');
  
      return this.http.get(`${ base_url }/todo/coleccion/usuario/${email}`, {
        headers: {
          'x-token': localStorage.getItem('token') || ''
        }
  
      });
  
  
    }

    /* ----------------crear paciente------------------ */

    paciente(formData: any) {

      return this.http.post(`${ base_url }/pacientes`, formData , {
        headers: {
          'x-token': localStorage.getItem('token') || ''
        }
  
      });

    }




    /* ---------------crear pareja---------------------- */

    pareja(formData: any) {

      return this.http.post(`${ base_url }/parejas`, formData , {
        headers: {
          'x-token': localStorage.getItem('token') || ''
        }
  
      });

    }
    /* --------------------------------------------------------- */
}
