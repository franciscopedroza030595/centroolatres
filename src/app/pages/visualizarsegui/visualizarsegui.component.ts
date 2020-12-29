import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-visualizarsegui',
  templateUrl: './visualizarsegui.component.html',
  styleUrls: ['./visualizarsegui.component.scss']
})
export class VisualizarseguiComponent implements OnInit {

  id: any;

  constructor(private actiRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.actiRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

}
