import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Servicio } from '../../models/servicio.model';

@Component({
  selector: 'app-servicio-card',
  imports: [CommonModule, CardModule],
  templateUrl: './servicio-card.component.html',
  styleUrl: './servicio-card.component.css'
})
export class ServicioCardComponent {
  @Input({ required: true }) servicio!: Servicio;
}
