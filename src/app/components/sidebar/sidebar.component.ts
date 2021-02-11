import { Component, EventEmitter, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Output } from '@angular/core';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() toggle = new EventEmitter<any>();
  visible: boolean = false;

  showmenu = false;

  

  constructor( private usuarioService: UsuarioService, private router: Router ) { }

  ngOnInit(): void {

    



  }

  onToggle() {
    this.visible = !this.visible;
    this.toggle.emit(this.visible);
    /* console.log("from side-menu", this.visible); */
    
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


  cerrarSession() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  solicitudhc() {

    this.router.navigate(['/solicitudhc']);
  }

}
