import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';



@Component({
  selector: 'app-webcamimage',
  templateUrl: './webcamimage.component.html',
  styleUrls: ['./webcamimage.component.scss']
})
export class WebcamimageComponent implements OnInit {

  @Output() webcamoutput: EventEmitter<any> = new EventEmitter();

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // latest snapshot
  public webcamImage: WebcamImage; 
  public errors: WebcamInitError[] = [];
  webcam: string;

  constructor() {
   
   }
 
  ngOnInit(): void {
  }
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  /* triggers observables for 2 fotos */
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.webcamoutput.emit(this.webcamImage.imageAsDataUrl);
  }


  /* for errors */
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

 

}
