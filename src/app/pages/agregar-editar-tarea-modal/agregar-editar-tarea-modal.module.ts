import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarEditarTareaModalPageRoutingModule } from './agregar-editar-tarea-modal-routing.module';

import { AgregarEditarTareaModalPage } from './agregar-editar-tarea-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarEditarTareaModalPageRoutingModule
  ],
  declarations: [AgregarEditarTareaModalPage]
})
export class AgregarEditarTareaModalPageModule {}
