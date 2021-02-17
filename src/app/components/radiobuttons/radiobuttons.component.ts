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
    
  
  

   

  }

  idea(){

  }

  normalHandle(event:any){ 

    let target = event.currentTarget;

        /* document.getElementById(target.name).className = this.classHide; */
    
    let getname = document.getElementById(target.name);


    if (getname === null) {
      console.log('oops');
    } else {
      // since you've done the nullable check
      // TS won't complain from this point on
      getname.className = this.classHide; // <- no error
    }

    


    for(let i = 0; i <  this.datosPrueba.length; i ++) {

      if ( this.datosPrueba[i].name === target.name) {

        this.datosPrueba[i].value = 'Normal';
      };
      
    };

    

    this.propagar.emit(this.datosPrueba);
 
  
    
}

anormalHandle(event:any){
    let target = event.currentTarget;
   
    let getname = document.getElementById(target.name);


    if (getname === null) {
      console.log('oops');
    } else {
      // since you've done the nullable check
      // TS won't complain from this point on
      getname.className = this.classTitular; // <- no error
    }
      
   

    for(let i = 0; i <  this.datosPrueba.length; i ++) {

      if ( this.datosPrueba[i].name === target.name) {

        this.datosPrueba[i].value = 'Anormal';
        

      };
      
    };

    
    this.propagar.emit(this.datosPrueba);
    
    

  
   
}

keyHandle(event:any, data:string) {

  

  for(let i = 0; i <  this.datosPrueba.length; i ++) {

    if ( this.datosPrueba[i].name === data) {

      this.datosPrueba[i].value = event.currentTarget.value;
      

    };
    
  };

 
  this.propagar.emit(this.datosPrueba);
  
 
}





}
