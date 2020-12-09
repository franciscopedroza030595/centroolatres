import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { DerivacioncasoComponent } from './pages/derivacioncaso/derivacioncaso.component';
import { RemisioncasoComponent } from './pages/remisioncaso/remisioncaso.component';

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
    DerivacioncasoComponent,
    RemisioncasoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
