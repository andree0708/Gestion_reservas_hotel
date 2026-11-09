import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioCardComponent } from '../../components/servicio-card/servicio-card.component';
import { Servicio } from '../../models/servicio.model';

@Component({
  selector: 'app-servicios',
  imports: [CommonModule, ServicioCardComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  servicios: Servicio[] = [
    {
      titulo: 'Desayuno Incluido',
      descripcion: 'Disfruta de un delicioso desayuno cada mañana con una amplia variedad de opciones.',
      imagen: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop'
    },
    {
      titulo: 'Gimnasio',
      descripcion: 'Mantente en forma en nuestro gimnasio bien equipado con máquinas de última generación.',
      imagen: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop'
    },
    {
      titulo: 'Piscina',
      descripcion: 'Relájate en nuestra piscina al aire libre con vista al jardín tropical.',
      imagen: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop'
    },
    {
      titulo: 'Wi-Fi Gratis',
      descripcion: 'Conectividad de alta velocidad en todas las áreas del hotel.',
      imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
      titulo: 'Spa',
      descripcion: 'Disfruta de tratamientos relajantes en nuestro spa de clase mundial.',
      imagen: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop'
    },
    {
      titulo: 'Restaurante',
      descripcion: 'Saborea la mejor cocina local e internacional en nuestro restaurante.',
      imagen: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop'
    }
  ];
}
