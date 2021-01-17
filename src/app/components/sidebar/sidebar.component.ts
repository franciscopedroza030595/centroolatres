import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  showFiller = false;

  showmenu = false;

  

  constructor( private usuarioService: UsuarioService, private router: Router ) { }

  ngOnInit(): void {

    



  }

  showMenu() {
    
    this.usuarioService.validarToken().subscribe((res: any) => {
   
      if (res === false ) {
        
        this.showmenu = false;
        
      } else {
       
        this.showmenu = true;
        
      }
    });

    
    
  }
  closeMenu() {
    
    this.showmenu = false;
    
  }

  cerrarSession() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

}
