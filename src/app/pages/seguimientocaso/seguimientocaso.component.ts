import { Component, OnInit } from '@angular/core';

import {  FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

import Swal from 'sweetalert2';

import {formatDate} from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

import { ConsultasService } from '../../services/consultas.service';

import jsPDF from 'jspdf';

import html2canvas from 'html2canvas';


@Component({
  selector: 'app-seguimientocaso',
  templateUrl: './seguimientocaso.component.html',
  styleUrls: ['./seguimientocaso.component.scss']
})
export class SeguimientocasoComponent implements OnInit {

  public formSubmitted = false;

  fecha: any;
  id: any;
  seccionesA = 0;
  secccionN = 0;

  secciones = false;

  infoSeguimientos: any;

  segui = false;

  nombreP = 'pacho';
  

  public seguiForm = this.fb.group({
    descripcion: ['', Validators.required ],
    situaciones: ['', Validators.required ],
    progreso: ['', Validators.required ],
    acuerdos: ['', Validators.required ],
    observaciones: ['', Validators.required ],
    ultima:['', Validators.required],
    paciente: [''],
    fecha:[]
   
    
  });

  constructor(private consultaService: ConsultasService, private fb: FormBuilder, private actiRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.id = this.actiRoute.snapshot.paramMap.get('id');
    console.log(this.id);


    this.consultaService.seguimientoID(this.id).subscribe((res: any) => {

      this.infoSeguimientos = res.resultados;
      console.log(this.infoSeguimientos);
      this.seccionesA = this.infoSeguimientos.length;
      this.secccionN = this.seccionesA + 1;
    
    });

        /* creo la fecha actual con la cual el registro es guardado */
        this.fecha = formatDate(new Date(), 'YYYY-MM-dd', 'en');



     /* prueba de pdf */
    /* const documento = new jsPDF();
    documento.text('Hola mundo!', 10, 10); // "Texto" , horizontal, vertical
    documento.save('hello.pdf');
     */



     /* -------------------- */
  }


  seguimiento() {
    this.formSubmitted = true;
    if ( this.seguiForm.invalid ) {
      Swal.fire('Advertencia' , 'Por favor llene los campos', 'error');
      return;
    }
   
    this.seguiForm.value.paciente = this.id;
    this.seguiForm.value.fecha = this.fecha;


    console.log(this.seguiForm.value);
    

  }


  verSecciones(){

    this.segui = true;
  }

  volver(){

    this.segui = false;
  }

  visualizarSeguim(id:any) {

    console.log(id);

    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/visualziarS/${id}`])
    );

    this.router.navigate([]).then(result => {  window.open(url, '_blank') });
  }


  /* para pdf y canvas html */

/*   downloadPDF(){
    // Extraemos el html desde el elemento div con su id 'htmlData'
    const DATA = document.getElementById('htmlData');
   
   // los parametros son:
   // portrait = vertical pt unidad de medida letra tamaño de hoja A4
    const documento = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
   
     const img = canvas.toDataURL('image/PNG');
   
     // Add image Canvas to PDF
     const margenH = 15;
     const margenV = 15; 
     const propiedadesImg = (documento as any).getImageProperties(img);
     console.log(propiedadesImg);
   
     // Calculamos los valores de ancho y alto del pdf ajustados con la img del html2canvas
     const pdfWidth = documento.internal.pageSize.getWidth() - 2 * margenH;
     const pdfHeight = (propiedadesImg.height * pdfWidth) / propiedadesImg.width;
   
     // Agregamos la imagen resultante a doc para ser introducida al pdf.
     // documentacion los parametros son:
     // 1 data de la imagen (string | HTMLImageElement | HTMLCanvasElement | Uint8Array)
     // 2 formato (string)
     // 3 coordenada x (number)
     // 4 coordenada y (number)
     // 5 ancho (number)
     // 6 alto (number)
     // 7 alias de la img (string)
     // 8 compresion (string) tipo de compresion de jpeg 'NONE', 'FAST', 'MEDIUM' and 'SLOW'
     // 9 rotacion (number) rotacion de 0 a 359 grados
     documento.addImage(img, 'PNG', margenH, margenV, pdfWidth, pdfHeight, undefined, 'FAST');
   
     return documento;
   }).then((docResult) => {
     docResult.save(`${this.nombreP}.pdf`);
   });
   } */


  /* ---------------------- */

}
