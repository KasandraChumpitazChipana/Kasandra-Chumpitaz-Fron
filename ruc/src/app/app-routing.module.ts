import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReniecComponent } from './components/reniec/reniec.component';

const routes: Routes = [
  // Ruta principal que muestra el componente Reniec
  { path: '', component: ReniecComponent },
  
  // Ruta explícita para Reniec (opcional)
  { path: 'reniec', component: ReniecComponent },
  
  // Si tienes otros componentes, puedes agregarlos aquí
  // { path: 'otro-componente', component: OtroComponent },
  
  // Ruta wildcard para manejar rutas no encontradas
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }