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

    

    this.consultaService.obtenerPaciente(this.cedula).subscribe((resp: any) => {
      
      console.log(resp);

      if(resp.resultados !== null) {

        this.id = resp.resultados.uid;

        console.log(this.id);
      

        Swal.fire('' , 'Paciente Existente', 'success').then((result) => {
          if (result.value) {
            
            if(this.tipoh === 'historiaA') {

              this.router.navigate(['/historiaA', this.id]);

            } else if(this.tipoh === 'terapiaP'){
              this.router.navigate(['/terapiaP', this.id]);
              
            } else {
              console.log('no');
            }
          
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

}
