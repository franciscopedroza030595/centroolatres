import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* pages/components */
import { HomeComponent } from './pages/home/home.component';
import { DatospersonalesComponent } from './pages/hc/datospersonales/datospersonales.component';
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











const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'datospersonales', component: DatospersonalesComponent},
  {path: 'historiaA/:id', component: HistoriaadultosComponent},
  {path: 'historiaN/:id', component: HistorianinosComponent},
  {path: 'terapiaP/:id', component: TerapiaparejasComponent},
  {path: 'registroP', component: RegistropacientesComponent},
  {path: 'datospareja', component: DatosparejaComponent},
  {path: 'remision/:id', component: RemisioncasoComponent},
  {path: 'busquedaP', component: BusquedapaComponent},
  {path: 'consultaP', component: ConsultapacientesComponent},
  {path: 'seguimientoC/:id', component: SeguimientocasoComponent},
  {path: 'visualziarS/:id', component: VisualizarseguiComponent},


  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
