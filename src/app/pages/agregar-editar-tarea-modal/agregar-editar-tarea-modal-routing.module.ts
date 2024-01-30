import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarEditarTareaModalPage } from './agregar-editar-tarea-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarEditarTareaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarEditarTareaModalPageRoutingModule {}
