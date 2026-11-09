import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Servicio } from '../../models/servicio.model';

/**
 * ServicioCardComponent
 * ─────────────────────────────────────────────────────────────────
 * Componente de presentación para mostrar un servicio del hotel.
 * Solo recibe datos via @Input. Sin lógica de negocio.
 *
 * USO:
 *   <app-servicio-card [servicio]="item"></app-servicio-card>
 * ─────────────────────────────────────────────────────────────────
 */
@Component({
  selector: 'app-servicio-card',
  imports: [CommonModule, CardModule],
  templateUrl: './servicio-card.component.html',
  styleUrl: './servicio-card.component.css'
})
export class ServicioCardComponent {
  @Input({ required: true }) servicio!: Servicio;
}
