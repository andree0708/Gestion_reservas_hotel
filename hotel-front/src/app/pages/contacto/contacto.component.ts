import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-contacto',
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, ToastModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
  providers: [MessageService]
})
export class ContactoComponent {
  contacto = {
    direccion: 'Calle 13 #2-45, Centro Histórico, Cartagena',
    telefono: '+57 300 631 2585',
    email: 'info@hoteltropical.com',
    horario: 'Recepción 24 horas · Todos los días'
  };

  form = { nombre: '', email: '', asunto: 'Reserva / disponibilidad', mensaje: '' };
  enviado = false;

  faqs = [
    { q: '¿El desayuno está incluido?', a: 'Sí, todas las tarifas incluyen el desayuno caribeño buffet de 6:30 a 10:30 en el Restaurante Candela.', abierto: true },
    { q: '¿Aceptan mascotas?', a: 'Aceptamos perros de hasta 15 kg en las habitaciones Jardín Doble y Familiar, con cargo único de $40. Avísanos al reservar.', abierto: false },
    { q: '¿Cómo llego desde el aeropuerto?', a: 'Estamos a 15 min del Aeropuerto Rafael Núñez. Ofrecemos traslado privado ($25) o puedes tomar taxi oficial ($10 aprox).', abierto: false },
    { q: '¿Puedo cancelar sin costo?', a: 'Sí. Cancela gratis hasta 48 horas antes de tu llegada desde tu correo de confirmación o por WhatsApp.', abierto: false }
  ];

  mapaUrl: SafeResourceUrl;

  constructor(private messageService: MessageService, private reservaService: ReservaService, sanitizer: DomSanitizer) {
    this.mapaUrl = sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps?q=Centro+Histórico+Cartagena+Colombia&output=embed');
  }

  toggleFaq(i: number): void {
    this.faqs[i].abierto = !this.faqs[i].abierto;
  }

  enviar(): void {
    if (!this.form.nombre.trim() || !this.form.email.includes('@') || !this.form.mensaje.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Revisa el formulario', detail: 'Nombre, correo válido y mensaje son obligatorios.' });
      return;
    }
    this.reservaService.guardarMensaje(this.form);
    this.enviado = true;
    this.messageService.add({ severity: 'success', summary: '¡Mensaje enviado!', detail: `${this.form.nombre.split(' ')[0]}, te responderemos en menos de 2 horas.` });
    this.form = { nombre: '', email: '', asunto: 'Reserva / disponibilidad', mensaje: '' };
    setTimeout(() => (this.enviado = false), 6000);
  }
}
