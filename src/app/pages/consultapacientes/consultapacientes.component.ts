import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ConsultasService } from '../../services/consultas.service';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';



@Component({
  selector: 'app-consultapacientes',
  templateUrl: './consultapacientes.component.html',
  styleUrls: ['./consultapacientes.component.scss']
})
export class ConsultapacientesComponent implements OnInit {

  public nameObj = {
    nombreU: '',
    apellidoU: '',
    cargo: ''
  }

  cedula = '';
  id= '';

  tipoh = '';

  paciente = false;

  consulta = false;

  constructor(private router: Router, private consultaService: ConsultasService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

        this.usuarioService.obtenerInfoUsuario().subscribe( (resp: any) => {
          console.log(resp);
          this.nameObj.nombreU = resp.resultados[0].nombre;
          this.nameObj.apellidoU = resp.resultados[0].apellido;
          this.nameObj.cargo = resp.resultados[0].profesion;
          
          localStorage.setItem('nameObj', JSON.stringify(this.nameObj));
        });

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

                case 'terapiaO':

                this.consultaService.terapiaOID(this.id).subscribe((res: any) => {


                  if(res.resultados !==null) {
      
                    Swal.fire('' , 'El Paciente ya tiene Terapia Registrada', 'error').then((result) => {
                      if (result.value) {
                        
                        this.consulta = false;
            
                      }
                    });
      
      
                  } else {
                    Swal.fire('' , 'Paciente Existente', 'success').then((result) => {
                      if (result.value) {
                        
                        
                        this.router.navigate(['/terapiaO', this.id]);
                        
      
                        
      
      
            
                      }
                    });
                  }
      
                });

                break;

                case 'historiaPA':

                this.consultaService.psiquiatricoID(this.id).subscribe((res: any) => {


                  if(res.resultados !==null) {
      
                    Swal.fire('' , 'El Paciente ya tiene Historia Psiquiatrica registrada', 'error').then((result) => {
                      if (result.value) {
                        
                        this.consulta = false;
            
                      }
                    });
      
      
                  } else {
                    Swal.fire('' , 'Paciente Existente', 'success').then((result) => {
                      if (result.value) {
                        
                        
                        this.router.navigate(['/psiquiatrica', this.id]);
                        
      
                        
      
      
            
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

                  case 'remision':
    
                    Swal.fire('' , 'Paciente Existente', 'success').then((result) => {
                      if (result.value) {
                        
                        
                        this.router.navigate(['/remision', this.id]);
                      
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

/* DESARROLLAR TODO LO REFERENTE A PAREJAS PARA SEGUIMIENTO POR ALGUNA CEDULA Y DEMAS FORMATOS */
      this.consultaService.obtenerPareja(this.cedula).subscribe((resp: any) => {
      
      
  
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

            case 'seguimientoP':

              Swal.fire('' , 'Pareja Existente', 'success').then((result) => {
                if (result.value) {
                  
                  
                  this.router.navigate(['/seguimientoC', this.id]);
                
                }
              });

              break;

            case 'remisionP':

              Swal.fire('' , 'Pareja Existente', 'success').then((result) => {
                if (result.value) {
                  
                  
                  this.router.navigate(['/remision', this.id]);
                
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


  terapiaO(){


    this.consulta = true;
    this.paciente = true;
    this.tipoh = 'terapiaO';
   

  }

  parejas(){

    this.consulta = true
    this.paciente = false;
    this.tipoh = 'terapiaP';

  }
/* en grupos no necesito enviar documento de paciente , de una lleno formulario */
  grupos(){
    
    this.router.navigate(['/grupos']);

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
