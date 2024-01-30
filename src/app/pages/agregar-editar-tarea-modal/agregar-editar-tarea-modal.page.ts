import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-editar-tarea-modal',
  templateUrl: './agregar-editar-tarea-modal.page.html',
  styleUrls: ['./agregar-editar-tarea-modal.page.scss'],
})
export class AgregarEditarTareaModalPage {
  public descripcion: string = '';

  constructor(private modalController: ModalController) {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  guardarTarea() {
    if (this.descripcion.trim() !== '') {
      this.modalController.dismiss({ descripcion: this.descripcion }, 'ok');
    }
  }
}
