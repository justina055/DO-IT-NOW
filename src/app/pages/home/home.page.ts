import { Component, ElementRef, ViewChild, booleanAttribute } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router) {}

  @ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>;

  openAlert: Boolean = false;

  startClicked() {
    // ehdwehdhwe
    // Puedes agregar la lógica que desees al hacer clic en el botón
    // Por ejemplo, redireccionar a otra página
    this.router.navigate(['/list-reorder']);
  }

  compartirEnWhatsApp() {
    // Lógica para compartir en WhatsApp
    const whatsappLink =
      'https://api.whatsapp.com/send?text=Descargate la app Do it now! es super útil';
    window.open(whatsappLink, '_blank');
    this.openAlert = true
    this.dialog.nativeElement.showModal()
  }

  si(){
    this.dialog.nativeElement.close();
  }

   no(){
    this.dialog.nativeElement.close();
   }

}