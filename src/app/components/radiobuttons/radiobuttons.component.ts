import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-radiobuttons',
  templateUrl: './radiobuttons.component.html',
  styleUrls: ['./radiobuttons.component.scss']
})
export class RadiobuttonsComponent implements OnInit {

  @Input() DataComponent: any; 
  
  @Output()
  propagar = new EventEmitter<any>();

  classTitular = "form-control show-element";
  classHide= "form-control hide-element ";
  statusTextArea ="";



  datosPrueba: any;

  
  

  constructor( ) { 

   
  }

  ngOnInit(): void {

    this.statusTextArea = this.classHide;

    this.datosPrueba = this.DataComponent;
    
    console.log(this.datosPrueba);

    for(let i = 0; i <  this.datosPrueba.length; i ++) {

        this.datosPrueba[i].value = 'Normal';
      
      
    };
    this.propagar.emit(this.datosPrueba);

  

   

  }

  normalHandle(event:any){ 

    let target = event.currentTarget;
    document.getElementById(target.name).className = this.classHide; 

    

    for(let i = 0; i <  this.datosPrueba.length; i ++) {

      if ( this.datosPrueba[i].name === target.name) {

        this.datosPrueba[i].value = 'Normal';
      };
      
    };

    console.log(this.datosPrueba);

    this.propagar.emit(this.datosPrueba);
 
  
    
}

anormalHandle(event:any){
    let target = event.currentTarget;
   
    document.getElementById(target.name).className = this.classTitular;


   

    for(let i = 0; i <  this.datosPrueba.length; i ++) {

      if ( this.datosPrueba[i].name === target.name) {

        this.datosPrueba[i].value = 'Anormal';
        

      };
      
    };

    console.log(this.datosPrueba);
    this.propagar.emit(this.datosPrueba);
    
    

  
   
}

keyHandle(event:any, data:string) {

  console.log(event.currentTarget.value);

  for(let i = 0; i <  this.datosPrueba.length; i ++) {

    if ( this.datosPrueba[i].name === data) {

      this.datosPrueba[i].value = event.currentTarget.value;
      

    };
    
  };

  console.log(this.datosPrueba);
  this.propagar.emit(this.datosPrueba);
  
 
}





}
