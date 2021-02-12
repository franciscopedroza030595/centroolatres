import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuarioService } from '../services/usuario.service';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    this.usuarioService.obtenerInfoUsuario().subscribe( (resp: any) => {
      
        if (resp.resultados[0].role === 'Auxiliar') {
  
          console.log('Usuario No Autorizado');
          Swal.fire('', 'Usuario No Autorizado', 'error' );
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      });  

      return true;
  }
  
}
