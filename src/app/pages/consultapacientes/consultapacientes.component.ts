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

  paciente = false;

  consulta = false;

  constructor(private router: Router, private consultaService: ConsultasService) { }

  ngOnInit(): void {
  }


  buscarC() {


    if(this.paciente === true) {

      

      this.consultaService.obtenerPaciente(this.cedula).subscribe((resp: any) => {
      
        console.log(resp);
  
        if(resp.resultados !== null) {
  
          this.id = resp.resultados.uid;
  
          console.log(this.id);

          switch (this.tipoh) {

            case 'historiaA':

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



              break;


              case 'historiaN':

                this.consultaService.historiaNID(this.id).subscribe((res: any) => {


                  if(res.resultados !==null) {
      
                    Swal.fire('' , 'El Paciente ya tiene Historia Registrada', 'error').then((result) => {
                      if (result.value) {
                        
                        this.consulta = false;
            
                      }
                    });
      
      
                  } else {
                    Swal.fire('' , 'Paciente Existente', 'success').then((result) => {
                      if (result.value) {
                        
                        
                        this.router.navigate(['/historiaN', this.id]);
                        
      
                        
      
      
            
                      }
                    });
                  }
      
                });

                break;

              case 'seguimiento':

                Swal.fire('' , 'Paciente Existente', 'success').then((result) => {
                  if (result.value) {
                    
                    
                    this.router.navigate(['/seguimientoC', this.id]);
                 
                  }
                });

                break;
             

              default:
                console.log("No such data exists!");
                break;


          }

     
        }
        else {
          Swal.fire('' , 'Paciente No Existente, por favor registre el paciente primero', 'error').then((result) => {
            if (result.value) {
      
              
            
            }
          });
        }
      });


    } else {


      this.consultaService.obtenerPareja(this.cedula).subscribe((resp: any) => {
      
        console.log(resp);
  
        if(resp.resultados !== null) {
  
          this.id = resp.resultados.uid;
  
          console.log(this.id);


          switch(this.tipoh) {

            case 'terapiaP':

              this.consultaService.terapiaPID(this.id).subscribe((res: any) => {


                if(res.resultados !==null) {
    
                  Swal.fire('' , 'La pareja ya tiene Historia Registrada', 'error').then((result) => {
                    if (result.value) {
                      
                      this.consulta = false;
          
                    }
                  });
    
    
                } else {
                  Swal.fire('' , 'Pareja Existente', 'success').then((result) => {
                    if (result.value) {
                      
                      
                      this.router.navigate(['/terapiaP', this.id]);
                    
                    }
                  });
                }
    
              });

              break;




          }

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


    this.consulta = true;
    this.paciente = true;
    this.tipoh = 'historiaA';
   

  }

  historiaN(){


    this.consulta = true;
    this.paciente = true;
    this.tipoh = 'historiaN';
   

  }

  historiaPA(){


    this.consulta = true;
    this.paciente = true;
    this.tipoh = 'historiaPA';
   

  }

  historiaPN(){


    this.consulta = true;
    this.paciente = true;
    this.tipoh = 'historiaPN';
   

  }

  parejas(){

    this.consulta = true
    this.paciente = false;
    this.tipoh = 'terapiaP';

  }

  grupos(){
    this.consulta = true
    this.tipoh = 'grupo';

  }

  remisionP(){

    this.consulta = true
    this.paciente = false;
    this.tipoh = 'remisionP';

  }

  remision(){

    this.consulta = true
    this.paciente = true;
    this.tipoh = 'remision';
    
  }

  seguimiento(){

    this.consulta = true
    this.paciente = true;
    this.tipoh = 'seguimiento';
    
  }

  seguimientoP(){

    this.consulta = true
    this.paciente = false;
    this.tipoh = 'seguimientoP';
    
  }

}
