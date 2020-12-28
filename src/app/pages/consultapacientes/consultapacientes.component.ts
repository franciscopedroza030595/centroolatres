import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ConsultasService } from '../../services/consultas.service';

import Swal from 'sweetalert2';




@Component({
  selector: 'app-consultapacientes',
  templateUrl: './consultapacientes.component.html',
  styleUrls: ['./consultapacientes.component.scss']
})
export class ConsultapacientesComponent implements OnInit {

  cedula = '';
  id= '';

  tipoh = '';

  consulta = false;

  constructor(private router: Router, private consultaService: ConsultasService) { }

  ngOnInit(): void {
  }


  buscarC() {


    if(this.tipoh === 'historiaA') {

      this.consultaService.obtenerPaciente(this.cedula).subscribe((resp: any) => {
      
        console.log(resp);
  
        if(resp.resultados !== null) {
  
          this.id = resp.resultados.uid;
  
          console.log(this.id);

          this.consultaService.historiaID(this.id).subscribe((res: any) => {


            if(res.resultados !==null) {

              Swal.fire('' , 'El Paciente ya tiene Historia Registrada', 'error').then((result) => {
                if (result.value) {
                  
                  this.consulta = false;
      
                }
              });


            } else {
              Swal.fire('' , 'Paciente Existente', 'success').then((result) => {
                if (result.value) {
                  
                  this.router.navigate(['/historiaA', this.id]);
      
                }
              });
            }

          });
        
  
          
        }
        else {
          Swal.fire('' , 'Paciente No Existente, por favor registre el paciente primero', 'error').then((result) => {
            if (result.value) {
      
              
            
            }
          });
        }
      });


    } 
    
    if(this.tipoh === 'terapiaP') {

      this.consultaService.obtenerPareja(this.cedula).subscribe((resp: any) => {
      
        console.log(resp);
  
        if(resp.resultados !== null) {
  
          this.id = resp.resultados.uid;
  
          console.log(this.id);
        
  
          Swal.fire('' , 'Pareja Existente', 'success').then((result) => {
            if (result.value) {
              
              
              this.router.navigate(['/terapiaP', this.id]);
  
            }
          });
        }
        else {
          Swal.fire('' , 'Pareja No Existente, por favor registre la pareja primero', 'error').then((result) => {
            if (result.value) {
      
              
            
            }
          });
        }
      });
      
    } 

    
    
  
  }



  historiaA(){


    this.consulta = true
    this.tipoh = 'historiaA';
   

  }

  parejas(){

    this.consulta = true
    this.tipoh = 'terapiaP';

  }

  derivacion(){

  }

  remision(){
    
  }

  seguimiento(){
    
  }

}
