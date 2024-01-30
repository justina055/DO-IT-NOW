import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router) {}

  startClicked() {
    // Puedes agregar la lógica que desees al hacer clic en el botón
    // Por ejemplo, redireccionar a otra página
    this.router.navigate(['/list-reorder']);
  }

  compartirEnWhatsApp() {
    // Lógica para compartir en WhatsApp
    const whatsappLink =
      'https://api.whatsapp.com/send?text=https://www.instagram.com/justinaeyras_/';
    window.open(whatsappLink, '_blank');
  }
}
