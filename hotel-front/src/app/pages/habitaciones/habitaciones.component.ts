import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HabitacionCardComponent } from '../../components/habitacion-card/habitacion-card.component';
import { Habitacion, HabitacionConTag } from '../../models/habitacion.model';

/**
 * HabitacionesComponent — Componente padre (smart component)
 * ─────────────────────────────────────────────────────────────────
 * Responsabilidades:
 *  1. Proveer los datos (mock por ahora — reemplaza con HTTP cuando conectes backend)
 *  2. Mapear Habitacion → HabitacionConTag (agrega tag visual)
 *  3. Pasar cada item a <app-habitacion-card> via @Input
 *  4. Escuchar los @Output del hijo: (reservar) y (verDetalles)
 *  5. Decidir qué hacer con el evento (mostrar toast, navegar, etc.)
 * ─────────────────────────────────────────────────────────────────
 */
@Component({
  selector: 'app-habitaciones',
  imports: [CommonModule, HabitacionCardComponent, ToastModule],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css',
  providers: [MessageService]
})
export class HabitacionesComponent implements OnInit {
  habitaciones: HabitacionConTag[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    // ─── DATOS MOCK ───────────────────────────────────────────────
    // Cuando conectes el backend, reemplaza este bloque con una
    // llamada a tu servicio HTTP y llama a this.mapearHabitaciones(data)
    const dataMock: Habitacion[] = [
      {
        id: 1,
        nombre: 'Habitación Doble',
        tipo: 'Doble',
        descripcion: 'Hasta 4 personas, cama doble, escritorio y balcón con vista al jardín.',
        precio: 150,
        capacidad: 4,
        disponible: true,
        imagenUrl: ''
      },
      {
        id: 2,
        nombre: 'Suite',
        tipo: 'Suite',
        descripcion: 'Suite de lujo con vista panorámica, jacuzzi privado y servicio VIP.',
        precio: 300,
        capacidad: 2,
        disponible: true,
        imagenUrl: ''
      },
      {
        id: 3,
        nombre: 'Habitación Individual',
        tipo: 'Individual',
        descripcion: 'Habitación acogedora ideal para viajeros individuales, incluye desayuno.',
        precio: 80,
        capacidad: 1,
        disponible: true,
        imagenUrl: ''
      }
    ];

    this.habitaciones = this.mapearHabitaciones(dataMock);
  }

  /**
   * Agrega las propiedades visuales (tag, tagSeverity) según el tipo de habitación.
   * Centralizado aquí para que HabitacionCardComponent no necesite conocer esta lógica.
   */
  private mapearHabitaciones(data: Habitacion[]): HabitacionConTag[] {
    return data.map(h => ({
      ...h,
      tag: h.tipo === 'Suite' ? 'Lujo' : h.tipo === 'Doble' ? 'Más popular' : 'Económica',
      tagSeverity: h.tipo === 'Suite'
        ? ('warn' as const)
        : h.tipo === 'Doble'
          ? ('success' as const)
          : ('info' as const)
    }));
  }

  // ─── MANEJADORES DE EVENTOS DEL HIJO ────────────────────────────

  /** Recibe el id emitido por <app-habitacion-card> al hacer clic en "Reservar" */
  onReservar(habitacionId: number): void {
    // Aquí puedes navegar a la ruta de reserva, abrir un modal, etc.
    // Ejemplo: this.router.navigate(['/reserva'], { queryParams: { habitacion: habitacionId } });
    this.messageService.add({
      severity: 'info',
      summary: 'Reservar',
      detail: `Has seleccionado reservar la habitación #${habitacionId}`
    });
  }

  /** Recibe la habitación completa emitida por <app-habitacion-card> al ver detalles */
  onVerDetalles(habitacion: HabitacionConTag): void {
    // El dialog se maneja internamente en HabitacionCardComponent.
    // Si necesitas lógica adicional en el padre (analytics, log, etc.) ponla aquí.
    console.log('Ver detalles:', habitacion.nombre);
  }
}
