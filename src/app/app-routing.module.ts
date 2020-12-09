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







const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'datospersonales/:tipohi', component: DatospersonalesComponent},
  {path: 'historiaA', component: HistoriaadultosComponent},
  {path: 'terapiaP', component: TerapiaparejasComponent},
  {path: 'registroP', component: RegistropacientesComponent},
  {path: 'datospareja', component: DatosparejaComponent},
  {path: 'remision', component: RemisioncasoComponent},


  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
