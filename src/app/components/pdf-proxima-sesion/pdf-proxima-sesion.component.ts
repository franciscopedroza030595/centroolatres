import { Component, OnInit, Input } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-pdf-proxima-sesion',
  templateUrl: './pdf-proxima-sesion.component.html',
  styleUrls: ['./pdf-proxima-sesion.component.scss']
})
export class PdfProximaSesionComponent implements OnInit {

  @Input() dataInput: any;
  constructor(private usuarioService: UsuarioService, private router: Router) { }
  fecha: string ='2021-02-12';
  nombreP: string ='John Cardona Perez'
  cedulaP: string ='1112222'
  edadP: string ='39'
  proximaS: string = '2021-02-28';
  progreso: string ='Progreso moderado'
  acuerdos: string = 'Se establece que haran pruebas en intervalos de 8 dias'
  nombreM: string = '';
  apellidoM: string = ''
  firmaM: string = ''
  profesionM: string = ''


  ngOnInit(): void {
    // console.log(this.usuarioService.obtenerInfoUsuario());
    this.usuarioService.obtenerInfoUsuario().subscribe(users =>{
      // console.log(users.resultados[0].nombre);
      this.nombreM = users.resultados[0].nombre;
      this.apellidoM = users.resultados[0].apellido;
      this.firmaM = users.resultados[0].firma;
      this.profesionM = users.resultados[0].profesion;
      
      
    })
    let data = JSON.parse(localStorage.getItem('dataSeguimiento')!);

    this.fecha = data.fecha;
    this.nombreP = data.nombreP;
    this.cedulaP = data.cedulaP;
    this.edadP = data.edadP;
    this.proximaS = formatDate(new Date(data.proximaS), 'YYYY-MM-dd HH:mm', 'en');
    this.progreso = data.progreso;
    this.acuerdos = data.acuerdos;
    // const test = this.datePipe.transform(data.proximaS,'yyyy-MM-dd');
    // console.log(test);
    
     
  }


    /* para pdf y canvas html */
    downloadPDF(){
      let timerInterval: any;
      Swal.fire({
        title: 'Por favor espere',
        html: '',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                // b.textContent = Swal.getTimerLeft()
              }
            }
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) { }
      })
      
      // Extraemos el html desde el elemento div con su id 'htmlData'
      const DATA = document.getElementById('htmlData');
        
      // los parametros son:
      // portrait = vertical pt unidad de medida letra tamaño de hoja A4
       const documento = new jsPDF('p', 'pt', 'a4');
       const options = {
         background: 'white',
         scale: 3,
         scrollY: -window.scrollY
       };
       html2canvas(DATA, options).then((canvas) => {
      
        const img = canvas.toDataURL('image/PNG');
      
        // Add image Canvas to PDF
        const margenH = 15;
        const margenV = 15; 
        const propiedadesImg = (documento as any).getImageProperties(img);
        
      
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
       //  docResult.save(`${this.title}_tutorial.pdf`);
         console.log(docResult.output('dataurlnewwindow'));
        // window.open();
        // this.seguimiento();
      });
       }

    seguimiento(){
      this.router.navigate(['/consultaP']);
    }   
}
