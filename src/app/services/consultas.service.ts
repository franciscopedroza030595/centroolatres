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


/* ----------------crear hisotriaN------------------ */

historiaN(formData: any) {

  return this.http.post(`${ base_url }/historiaN`, formData , {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });

}


/* -----------obtener historiaA por id------------------ */
historiaID(id:any) {

    

  return this.http.get(`${ base_url }/todo/coleccion/historiaA/${id}`, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });


}
/* -----------obtener historiaN por id------------------ */
historiaNID(id:any) {

    

  return this.http.get(`${ base_url }/todo/coleccion/historiaN/${id}`, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });


}
/* -----------obtener terapiaO por id------------------ */
terapiaOID(id:any) {

    

  return this.http.get(`${ base_url }/todo/coleccion/terapiaO/${id}`, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });


}

/*  -----------obtener h psiquiatrico por id------------------ */
psiquiatricoID(id:any) {

    

  return this.http.get(`${ base_url }/todo/coleccion/psiquiatrica/${id}`, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });


}

/* -----------obtener terapiaP por id------------------ */
terapiaPID(id:any) {

    

  return this.http.get(`${ base_url }/todo/coleccion/terapiaP/${id}`, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });


}
/* -----------obtener seguimientos por id del paciente------------------ */
seguimientoID(id:any) {

  

  return this.http.get(`${ base_url }/todo/coleccion/seguimiento/${id}`, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });


}

/* -----------obtener remision por id del paciente------------------ */
remisionID(id:any) {

    

  return this.http.get(`${ base_url }/todo/coleccion/remision/${id}`, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });


}
/* -----------obtener seguimiento por id del seguimiento ------------------ */
seguimiento(id:any) {

    

  return this.http.get(`${ base_url }/todo/coleccion/seguimientoid/${id}`, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });


}
/* -----------obtener remision por id del seguimiento ------------------ */
remision(id:any) {

    

  return this.http.get(`${ base_url }/todo/coleccion/remisionid/${id}`, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });


}
/* ----------------crear seguimientoPaciente------------------ */

seguimientoPa(formData: any) {

  return this.http.post(`${ base_url }/seguimiento`, formData , {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });

}

/* ----------------crear remisionPaciente------------------ */

remisionPa(formData: any) {

  return this.http.post(`${ base_url }/remision`, formData , {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });

}
/* ------------------------------------- */
/* ----------------crear TerapiaP------------------ */

terapiaP(formData: any) {

  return this.http.post(`${ base_url }/terapiaP`, formData , {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });

}

/* ----------------crear grupo------------------ */

grupo(formData: any) {

  return this.http.post(`${ base_url }/grupo`, formData , {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });

}
/* ----------------crear terapia ocupacional------------------ */

terapiaO(formData: any) {

  return this.http.post(`${ base_url }/terapiaocu`, formData , {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });

}
/* ----------------crear historia Psiquiatrica----------------- */

psiqui(formData: any) {

  return this.http.post(`${ base_url }/psiquiatrica`, formData , {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }

  });

}
/* ------------------------------------- */

}
