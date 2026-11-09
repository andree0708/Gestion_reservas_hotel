import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

/** Información de contacto del hotel */
interface InfoContacto {
  direccion: string;
  telefono: string;
  email: string;
  horario: string;
}

/**
 * ContactoComponent — Página de contacto
 * Muestra la información de contacto del hotel
 * y el formulario para que los visitantes envíen mensajes.
 */
@Component({
  selector: 'app-contacto',
  imports: [CommonModule, CardModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  /** Datos de contacto del Hotel Tropical */
  contacto: InfoContacto = {
    direccion: 'Calle 13, Cartagena',
    telefono: '+57 3006312585',
    email: 'info@hoteltropical.com',
    horario: 'Lunes a Domingo: 24 horas'
  };
}
