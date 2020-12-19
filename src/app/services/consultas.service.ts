import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient) { }

   /* ------------------------------------------------- */

   obtenerPaciente(cedula:any) {

    

    return this.http.get(`${ base_url }/todo/coleccion/paciente/${cedula}`, {
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }

    });


  }

/* ------------------------------------------------- */
obtenerPareja(cedula:any) {

    

  return this.http.get(`${ base_url }/todo/coleccion/pareja/${cedula}`, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });


}

/* ------------------------------------------------- */

pacienteporID(id:any) {

    

  return this.http.get(`${ base_url }/todo/coleccion/pacienteid/${id}`, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });


}
/* ------------------------------------------------- */
/* ------------------------------------------------- */

parejaporID(id:any) {

    

  return this.http.get(`${ base_url }/todo/coleccion/parejaid/${id}`, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });


}
/* ------------------------------------------------- */

/* ----------------crear hisotriaA------------------ */

historiaA(formData: any) {

  return this.http.post(`${ base_url }/historiaA`, formData , {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });

}
/* ----------------crear TerapiaP------------------ */

terapiaP(formData: any) {

  return this.http.post(`${ base_url }/terapiaP`, formData , {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });

}
/* ------------------------------------- */

}
