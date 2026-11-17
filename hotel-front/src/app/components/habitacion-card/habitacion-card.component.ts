import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { HabitacionConTag } from '../../models/habitacion.model';
import { AMENITY_LABELS } from '../../data/hotel.data';

/**
 * HabitacionCardComponent — tarjeta premium de habitación.
 * Dumb component: recibe datos via @Input y emite eventos via @Output.
 */
@Component({
  selector: 'app-habitacion-card',
  imports: [CommonModule, CardModule, ButtonModule, TagModule, DialogModule, RatingModule, FormsModule],
  templateUrl: './habitacion-card.component.html',
  styleUrl: './habitacion-card.component.css'
})
export class HabitacionCardComponent {
  @Input({ required: true }) habitacion!: HabitacionConTag;

  /** Emite el id al hacer clic en "Reservar" */
  @Output() reservar = new EventEmitter<number>();
  /** Emite el objeto completo al abrir detalles */
  @Output() verDetalles = new EventEmitter<HabitacionConTag>();

  detalleVisible = false;
  fotoActiva = 0;
  estrellas = 0;

  ngOnInit(): void {
    this.estrellas = this.habitacion.rating ?? 4.5;
  }

  get fotos(): string[] {
    const h = this.habitacion;
    if (h.galeria?.length) return h.galeria;
    return h.imagenUrl ? [h.imagenUrl] : [];
  }

  amenidadInfo(key: string): { icon: string; label: string } {
    return AMENITY_LABELS[key] ?? { icon: 'pi pi-check', label: key };
  }

  onReservar(): void {
    this.reservar.emit(this.habitacion.id);
  }

  onVerDetalles(): void {
    this.detalleVisible = true;
    this.fotoActiva = 0;
    this.verDetalles.emit(this.habitacion);
  }
}
