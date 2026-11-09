import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { HabitacionConTag } from '../../models/habitacion.model';

/**
 * HabitacionCardComponent
 * ─────────────────────────────────────────────────────────────────
 * Componente de presentación (dumb component).
 * Solo recibe datos via @Input y emite eventos via @Output.
 * NO hace llamadas HTTP, NO inyecta servicios.
 *
 * USO EN EL COMPONENTE PADRE:
 *
 *   <app-habitacion-card
 *     [habitacion]="item"
 *     (reservar)="onReservar($event)"
 *     (verDetalles)="onVerDetalles($event)">
 *   </app-habitacion-card>
 * ─────────────────────────────────────────────────────────────────
 */
@Component({
  selector: 'app-habitacion-card',
  imports: [CommonModule, CardModule, ButtonModule, TagModule, DialogModule],
  templateUrl: './habitacion-card.component.html',
  styleUrl: './habitacion-card.component.css'
})
export class HabitacionCardComponent {
  /** Datos completos de la habitación que se va a mostrar */
  @Input({ required: true }) habitacion!: HabitacionConTag;

  /** Emite el id de la habitación cuando el usuario hace clic en "Reservar" */
  @Output() reservar = new EventEmitter<number>();

  /** Emite el objeto completo cuando el usuario hace clic en "Ver detalles" */
  @Output() verDetalles = new EventEmitter<HabitacionConTag>();

  /** Estado interno del dialog de detalles — no expuesto al padre */
  detalleVisible = false;

  onReservar(): void {
    this.reservar.emit(this.habitacion.id);
  }

  onVerDetalles(): void {
    this.detalleVisible = true;
    this.verDetalles.emit(this.habitacion);
  }
}
