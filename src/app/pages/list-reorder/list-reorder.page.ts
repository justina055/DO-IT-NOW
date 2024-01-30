import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail, ModalController } from '@ionic/angular';
import { Tarea } from 'src/app/core/interfaces/tarea';
import { AgregarEditarTareaModalPage } from '../agregar-editar-tarea-modal/agregar-editar-tarea-modal.page';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-reorder',
  templateUrl: './list-reorder.page.html',
  styleUrls: ['./list-reorder.page.scss'],
})
export class ListReorderPage implements OnInit {
  public tareas: Tarea[] = [];
  public tareasFinalizadas: Tarea[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private storage: Storage,
    private router: Router
  ) {}

  startClicked() {
    // Puedes agregar la lógica que desees al hacer clic en el botón
    // Por ejemplo, redireccionar a otra página
    this.router.navigate(['/home']);
  }

  async ngOnInit() {
    // Inicializar el almacenamiento
    await this.storage.create();

    // Cargar tareas desde el almacenamiento local al inicializar
    this.tareas = (await this.storage.get('pendientes')) || [];
    this.tareasFinalizadas = (await this.storage.get('finalizadas')) || [];
  }

  async handleOrder($event: CustomEvent<ItemReorderEventDetail>) {
    const tarea = this.tareas[$event.detail.from];
    this.tareas.splice($event.detail.from, 1);
    this.tareas.splice($event.detail.to, 0, tarea);

    // Actualizar el estado de las tareas en el almacenamiento local
    await this.actualizarTareasEnAlmacenamiento();

    $event.detail.complete();
  }

  async handleOrderFinalizadas($event: CustomEvent<ItemReorderEventDetail>) {
    const tarea = this.tareasFinalizadas[$event.detail.from];
    this.tareasFinalizadas.splice($event.detail.from, 1);
    this.tareasFinalizadas.splice($event.detail.to, 0, tarea);

    // Actualizar el estado de las tareas en el almacenamiento local
    await this.actualizarTareasEnAlmacenamiento();

    $event.detail.complete();
  }

  async eliminarTarea(index: number, lista: 'pendientes' | 'finalizadas') {
    if (lista === 'pendientes') {
      // Eliminar la tarea de la lista de "Tareas Pendientes"
      this.tareas.splice(index, 1);
    } else if (lista === 'finalizadas') {
      this.tareasFinalizadas.splice(index, 1);
    }

    // Actualizar el estado de las tareas en el almacenamiento local
    this.actualizarTareasEnAlmacenamiento();

    this.mostrarToast('Tarea eliminada con éxito', 'danger');
  }

  async editarTarea(index: number) {
    const tarea = { ...this.tareas[index] };

    const modal = await this.modalController.create({
      component: AgregarEditarTareaModalPage,
      componentProps: {
        descripcion: tarea.descripcion,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data.role === 'ok') {
        // Actualizar la tarea con los cambios realizados
        this.tareas[index].descripcion = data.data.descripcion;

        // Actualizar el estado de las tareas en el almacenamiento local
        this.actualizarTareasEnAlmacenamiento();

        this.mostrarToast('Tarea actualizada con éxito', 'warning');
      }
    });

    await modal.present();
  }

  async agregarNuevaTarea() {
    const modal = await this.modalController.create({
      component: AgregarEditarTareaModalPage,
    });

    modal.onDidDismiss().then((data) => {
      if (data.role === 'ok') {
        // Agregar una nueva tarea a la lista de "Tareas Pendientes"
        const nuevaTarea: Tarea = {
          id: this.tareas.length + 1,
          descripcion: data.data.descripcion,
        };

        this.tareas.push(nuevaTarea);

        // Guardar tareas pendientes en el almacenamiento local
        this.storage.set('pendientes', this.tareas).then(() => {
          // Mostrar un mensaje de confirmación
          this.mostrarToast('Tarea agregada con éxito', 'primary');
        });
      }
    });

    await modal.present();
  }

  async mostrarToast(
    mensaje: string,
    color: 'success' | 'primary' | 'warning' | 'danger'
  ) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      position: 'bottom',
      color: color,
    });

    toast.present();
  }

  eliminarTodasFinalizadas() {
    // Eliminar todas las tareas finalizadas
    this.tareasFinalizadas = [];
    this.storage.set('finalizadas', this.tareasFinalizadas).then(() => {
      // Mostrar un mensaje de confirmación
      this.mostrarToast(
        'Todas las tareas finalizadas fueron eliminadas',
        'danger'
      );
    });
  }

  marcarComoFinalizada(index: number) {
    // Obtener la tarea a marcar como finalizada
    const tarea = this.tareas[index];

    // Mover la tarea de la lista de "Tareas Pendientes" a la lista de "Tareas Finalizadas"
    this.tareas.splice(index, 1);
    this.tareasFinalizadas.push(tarea);

    // Actualizar el estado de las tareas en el almacenamiento local
    this.actualizarTareasEnAlmacenamiento();

    this.mostrarToast('Tarea finalizada', 'success');
  }

  ordenarTareasPorOrden(tareas: Tarea[]): Tarea[] {
    return tareas
      .slice()
      .sort(
        (a, b) =>
          (a.orden ?? Number.MAX_SAFE_INTEGER) -
          (b.orden ?? Number.MAX_SAFE_INTEGER)
      );
  }

  private async actualizarTareasEnAlmacenamiento() {
    await this.storage.set('pendientes', this.tareas);
    await this.storage.set('finalizadas', this.tareasFinalizadas);
  }
}
