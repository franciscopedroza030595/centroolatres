import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token: any = localStorage.getItem('token');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          Swal.fire('', 'Por favor inicie sesion', 'error' );
          
          this.router.navigateByUrl('/home');
        }
        if (err.status === 400) {
          Swal.fire('', 'Error De Solicitud Con El Servidor', 'error' );
          
          this.router.navigateByUrl('/home');
        }
        if (err.status === 0) {
          Swal.fire('', 'Error De Conexion Con El Servidor', 'error' );
         
          this.router.navigateByUrl('/home');
        }
        if (err.status === 500) {
          Swal.fire('', 'Error Del Servidor Inesperado', 'error' );
         
          this.router.navigateByUrl('/home');
        }
        if (err.status === 504) {
          Swal.fire('', 'Tiempo De Espera Agotado', 'error' );
         
          this.router.navigateByUrl('/home');
        }

        return throwError( err );

      })
    );

  }
}

