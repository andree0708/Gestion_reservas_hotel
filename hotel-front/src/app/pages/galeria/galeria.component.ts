import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GALERIA_IMGS } from '../../data/hotel.data';

@Component({
  selector: 'app-galeria',
  imports: [CommonModule, RouterLink],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {
  fotos = GALERIA_IMGS;
  activa: number | null = null;

  abrir(i: number): void {
    this.activa = i;
    document.body.style.overflow = 'hidden';
  }

  cerrar(): void {
    this.activa = null;
    document.body.style.overflow = '';
  }

  mover(dir: 1 | -1): void {
    if (this.activa === null) return;
    this.activa = (this.activa + dir + this.fotos.length) % this.fotos.length;
  }
}
