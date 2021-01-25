import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
/* interceptors */
import { InterceptorService } from './interceptors/interceptor.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {DpDatePickerModule} from 'ng2-date-picker';

import { SignaturePadModule } from 'angular2-signaturepad';

import {WebcamModule} from 'ngx-webcam';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DatospersonalesComponent } from './pages/hc/datospersonales/datospersonales.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { HistoriaadultosComponent } from './pages/historiaadultos/historiaadultos.component';
import { TerapiaparejasComponent } from './pages/terapiaparejas/terapiaparejas.component';
import { RegistropacientesComponent } from './pages/registropacientes/registropacientes.component';
import { DatosparejaComponent } from './pages/datospareja/datospareja.component';
import { RemisioncasoComponent } from './pages/remisioncaso/remisioncaso.component';
import { BusquedapaComponent } from './pages/busquedapa/busquedapa.component';
import { ConsultapacientesComponent } from './pages/consultapacientes/consultapacientes.component';
import { SeguimientocasoComponent } from './pages/seguimientocaso/seguimientocaso.component';
import { VisualizarseguiComponent } from './pages/visualizarsegui/visualizarsegui.component';
import { HistorianinosComponent } from './pages/historianinos/historianinos.component';
import { GruposComponent } from './pages/grupos/grupos.component';
import { PsiquiatricaComponent } from './pages/psiquiatrica/psiquiatrica.component';
import { TerapiaocupaComponent } from './pages/terapiaocupa/terapiaocupa.component';
import { SolicitudhcComponent } from './pages/solicitudhc/solicitudhc.component';
import { SignaturefildComponent } from './components/signaturefild/signaturefild.component';
import { WebcamimageComponent } from './components/webcamimage/webcamimage.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DatospersonalesComponent,
    SidebarComponent,
    LoginComponent,
    HistoriaadultosComponent,
    TerapiaparejasComponent,
    RegistropacientesComponent,
    DatosparejaComponent,
    RemisioncasoComponent,
    BusquedapaComponent,
    ConsultapacientesComponent,
    SeguimientocasoComponent,
    VisualizarseguiComponent,
    HistorianinosComponent,
    GruposComponent,
    PsiquiatricaComponent,
    TerapiaocupaComponent,
    SolicitudhcComponent,
    SignaturefildComponent,
    WebcamimageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    SignaturePadModule,
    WebcamModule  

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
