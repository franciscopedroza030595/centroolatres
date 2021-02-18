import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';



@Component({
  selector: 'app-signaturefild',
  templateUrl: './signaturefild.component.html',
  styleUrls: ['./signaturefild.component.scss']
})
export class SignaturefildComponent implements OnInit {

  @Output () firmaClick: EventEmitter<any> = new EventEmitter(); //outpu del component

   /* for signature  */

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 550,
    'canvasHeight': 200,
    
    
  };

  signature: any;

  constructor() { }

  ngOnInit(): void {
  }


 


  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('backgroundColor', 'rgb(255, 255, 255)');  // Cambiar el color del fondo
    this.signaturePad.set('penColor', 'rgb(0, 0, 0)'); // Cambiar el color de la pluma
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API

    
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
  }


  drawComplete() {
    this.signature = this.signaturePad.toDataURL();
    this.firmaClick.emit(this.signature);
  } 

  clearSignature() {
    this.signaturePad.clear();
  }
}
