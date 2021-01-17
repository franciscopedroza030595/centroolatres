import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
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
    SolicitudhcComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
