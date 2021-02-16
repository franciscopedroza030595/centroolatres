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
import { GruposComponent } from './pages/grupos/grupos.component';
import { TerapiaocupaComponent } from './pages/terapiaocupa/terapiaocupa.component';
import { PsiquiatricaComponent } from './pages/psiquiatrica/psiquiatrica.component';
import { SolicitudhcComponent } from './pages/solicitudhc/solicitudhc.component';
import { VersolicitudesComponent } from './pages/versolicitudes/versolicitudes.component';



/* guards */
import { AuxiliarGuard } from './guards/auxiliar.guard';
import { PsicologoGuard } from './guards/psicologo.guard';
import { PsiquiatraGuard } from './guards/psiquiatra.guard';
import { TerapeutaGuard } from './guards/terapeuta.guard';
import { PdfProximaSesionComponent } from './components/pdf-proxima-sesion/pdf-proxima-sesion.component';









const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'datospersonales', component: DatospersonalesComponent},
  {path: 'historiaA/:id', canActivate:[PsiquiatraGuard, TerapeutaGuard], component: HistoriaadultosComponent},
  {path: 'historiaN/:id', canActivate:[PsiquiatraGuard, TerapeutaGuard], component: HistorianinosComponent},
  {path: 'terapiaP/:id', component: TerapiaparejasComponent},
  {path: 'registroP', canActivate:[PsicologoGuard, PsiquiatraGuard], component: RegistropacientesComponent},
  {path: 'datospareja', component: DatosparejaComponent},
  {path: 'remision/:id', component: RemisioncasoComponent},
  {path: 'busquedaP', component: BusquedapaComponent},
  {path: 'consultaP', canActivate:[AuxiliarGuard], component: ConsultapacientesComponent},
  {path: 'seguimientoC/:id', component: SeguimientocasoComponent},
  {path: 'visualziarS/:id/:tipo/:pareja', component: VisualizarseguiComponent},
  {path: 'grupos', component: GruposComponent},
  {path: 'terapiaO/:id', canActivate:[PsicologoGuard, PsiquiatraGuard], component: TerapiaocupaComponent},
  {path: 'psiquiatrica/:id', canActivate:[PsicologoGuard, TerapeutaGuard], component: PsiquiatricaComponent},
  {path: 'solicitudhc', component: SolicitudhcComponent},
  {path: 'versolicitudhc', canActivate:[PsicologoGuard, PsiquiatraGuard, AuxiliarGuard, TerapeutaGuard], component: VersolicitudesComponent},
  {path: 'pdfseguimiento', component: PdfProximaSesionComponent},


  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
