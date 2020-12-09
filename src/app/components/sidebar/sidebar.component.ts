import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  showFiller = false;

  showmenu = false;

  constructor() { }

  ngOnInit(): void {
  }

  showMenu() {
    
    this.showmenu = true;

    
    
  }
  closeMenu() {
    
    this.showmenu = false;

    
    
  }

}
