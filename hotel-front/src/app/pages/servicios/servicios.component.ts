import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioCardComponent } from '../../components/servicio-card/servicio-card.component';
import { Servicio } from '../../models/servicio.model';

/**
 * ServiciosComponent — Página de servicios adicionales
 * Lista todos los servicios disponibles del hotel
 * usando el componente reutilizable ServicioCardComponent.
 */
@Component({
  selector: 'app-servicios',
  imports: [CommonModule, ServicioCardComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  /** Listado de servicios adicionales ofrecidos por el hotel */
  servicios: Servicio[] = [
    {
      titulo: 'Recepción 24/7',
      descripcion: 'Atención constante para tu tranquilidad. Estamos disponibles en todo momento.',
      imagen: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop'
    },
    {
      titulo: 'Desayuno Tropical',
      descripcion: 'Disfruta de un delicioso desayuno cada mañana con opciones frescas y deliciosas.',
      imagen: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop'
    },
    {
      titulo: 'Traslados',
      descripcion: 'Cotizamos cómodas rutas desde y hacia el aeropuerto.',
      imagen: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop'
    },
    {
      titulo: 'Piscina y Solárium',
      descripcion: 'Relájate en nuestra piscina al aire libre con vista a la selva.',
      imagen: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop'
    },
    {
      titulo: 'Spa y Masajes',
      descripcion: 'Experiencias de bienestar para recargar energías con tratamientos relajantes.',
      imagen: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop'
    },
    {
      titulo: 'Actividades',
      descripcion: 'Tours, música y momentos para disfrutar en familia o pareja.',
      imagen: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop'
    }
  ];
}
