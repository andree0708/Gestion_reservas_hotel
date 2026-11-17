import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HabitacionCardComponent } from '../../components/habitacion-card/habitacion-card.component';
import { ServicioCardComponent } from '../../components/servicio-card/servicio-card.component';
import { HabitacionConTag } from '../../models/habitacion.model';
import {
  HABITACIONES_DATA, SERVICIOS_DATA, GALERIA_IMGS,
  HERO_IMG, PLAYA_IMG, LOBBY_IMG, mapearHabitaciones
} from '../../data/hotel.data';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, FormsModule, ButtonModule, CardModule, RatingModule, ToastModule, HabitacionCardComponent, ServicioCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  heroImg = HERO_IMG;
  playaImg = PLAYA_IMG;
  lobbyImg = LOBBY_IMG;

  llegada = '';
  salida = '';
  huespedes = 2;

  destacadas: HabitacionConTag[] = [];
  serviciosPreview = SERVICIOS_DATA.slice(0, 3);
  galeriaPreview = GALERIA_IMGS.slice(0, 4);

  stats = [
    { valor: '4.9', sufijo: '/5', etiqueta: 'Calificación media', icon: 'pi pi-star-fill' },
    { valor: '+12k', sufijo: '', etiqueta: 'Huéspedes felices', icon: 'pi pi-users' },
    { valor: '26', sufijo: '', etiqueta: 'Años frente al mar', icon: 'pi pi-compass' },
    { valor: '98', sufijo: '%', etiqueta: 'Recomiendan volver', icon: 'pi pi-heart' }
  ];

  experiencias = [
    { icon: 'pi pi-compass', titulo: 'Tour ciudad amurallada', texto: 'Recorrido guiado al atardecer con degustación de cocadas.' },
    { icon: 'pi pi-send', titulo: 'Atardecer en yate', texto: 'Salidas diarias por la bahía con open bar de corozo.' },
    { icon: 'pi pi-sparkles', titulo: 'Ritual de spa', texto: 'Masaje de cacao de 60 min en palapa frente al mar.' },
    { icon: 'pi pi-shop', titulo: 'Clase de cocina', texto: 'Aprende el arroz con coco con nuestro chef ejecutivo.' }
  ];

  testimonios = [
    { nombre: 'María González', origen: 'Bogotá · Suite Horizonte', comentario: 'Despertar con el mar frente a la cama y el jacuzzi al atardecer… no hay palabras. El servicio VIP estuvo pendiente de todo sin ser invasivo.', rating: 5, inicial: 'M' },
    { nombre: 'Carlos Ramírez', origen: 'Medellín · Jardín Doble', comentario: 'Viajamos con dos niños y todo fue perfecto: la habitación familiar, la piscina y el personal que los trataba como reyes. Volveremos en diciembre.', rating: 5, inicial: 'C' },
    { nombre: 'Ana Martínez', origen: 'Ciudad de México · Balcón Colonial', comentario: 'El balcón colonial es un sueño y el desayuno caribeño el mejor que he probado en un hotel. Cartagena + Hotel Tropical = plan perfecto.', rating: 5, inicial: 'A' }
  ];

  constructor(private reservaService: ReservaService, private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
    this.destacadas = mapearHabitaciones(HABITACIONES_DATA).slice(0, 3);
    this.llegada = this.reservaService.hoyMas(7);
    this.salida = this.reservaService.hoyMas(10);
  }

  buscar(): void {
    if (!this.llegada || !this.salida) {
      this.messageService.add({ severity: 'warn', summary: 'Faltan fechas', detail: 'Elige tus fechas de llegada y salida.' });
      return;
    }
    if (new Date(this.salida) <= new Date(this.llegada)) {
      this.messageService.add({ severity: 'error', summary: 'Fechas inválidas', detail: 'La salida debe ser posterior a la llegada.' });
      return;
    }
    this.reservaService.guardarBusqueda({ llegada: this.llegada, salida: this.salida, huespedes: this.huespedes });
    const noches = this.reservaService.nochesEntre(this.llegada, this.salida);
    this.messageService.add({ severity: 'success', summary: '¡Vamos allá!', detail: `${noches} noche(s) · ${this.huespedes} huésped(es). Elige tu habitación.` });
    setTimeout(() => this.router.navigate(['/habitaciones']), 600);
  }

  onReservar(id: number): void {
    this.router.navigate(['/reserva'], { queryParams: { habitacion: id } });
  }

  onVerDetalles(h: HabitacionConTag): void {
    console.log('Ver detalles:', h.nombre);
  }
}
