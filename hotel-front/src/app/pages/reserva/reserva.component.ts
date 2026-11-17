import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HabitacionConTag, Reserva } from '../../models/habitacion.model';
import { HABITACIONES_DATA, mapearHabitaciones, AMENITY_LABELS } from '../../data/hotel.data';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-reserva',
  imports: [CommonModule, FormsModule, RouterLink, ToastModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css',
  providers: [MessageService]
})
export class ReservaComponent implements OnInit {
  paso = 1;
  habitaciones: HabitacionConTag[] = [];
  habitacionSel?: HabitacionConTag;

  llegada = '';
  salida = '';
  huespedes = 2;
  amenidadInfo = (k: string) => AMENITY_LABELS[k] ?? { icon: 'pi pi-check', label: k };

  huesped = { nombre: '', email: '', telefono: '', peticiones: '' };
  confirmada?: Reserva;
  misReservas: Reserva[] = [];
  minLlegada = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservaService: ReservaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.habitaciones = mapearHabitaciones(HABITACIONES_DATA);
    this.minLlegada = this.reservaService.hoyMas(0);
    const guardada = this.reservaService.leerBusqueda();
    this.llegada = guardada?.llegada ?? this.reservaService.hoyMas(7);
    this.salida = guardada?.salida ?? this.reservaService.hoyMas(10);
    this.huespedes = guardada?.huespedes ?? 2;

    const id = Number(this.route.snapshot.queryParamMap.get('habitacion'));
    if (id) {
      const h = this.habitaciones.find(x => x.id === id);
      if (h) { this.habitacionSel = h; this.paso = 2; }
    }
    this.misReservas = this.reservaService.listar();
  }

  get noches(): number {
    return this.reservaService.nochesEntre(this.llegada, this.salida);
  }
  get subtotal(): number {
    return (this.habitacionSel?.precio ?? 0) * this.noches;
  }
  get impuestos(): number {
    return Math.round(this.subtotal * 0.08);
  }
  get total(): number {
    return this.subtotal + this.impuestos;
  }

  elegir(h: HabitacionConTag): void {
    this.habitacionSel = h;
    this.paso = 2;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  fechasValidas(): boolean {
    return !!this.llegada && !!this.salida && new Date(this.salida) > new Date(this.llegada) && !!this.habitacionSel;
  }

  irPaso2(): void {
    if (!this.fechasValidas()) {
      this.messageService.add({ severity: 'warn', summary: 'Revisa las fechas', detail: 'La salida debe ser posterior a la llegada.' });
      return;
    }
    this.paso = 2;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  confirmar(): void {
    if (!this.habitacionSel) return;
    if (!this.huesped.nombre.trim() || !this.huesped.email.includes('@') || !this.huesped.telefono.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Datos incompletos', detail: 'Nombre, correo válido y teléfono son obligatorios.' });
      return;
    }
    this.confirmada = this.reservaService.crear({
      habitacionId: this.habitacionSel.id,
      habitacionNombre: this.habitacionSel.nombre,
      nombreHuesped: this.huesped.nombre,
      email: this.huesped.email,
      telefono: this.huesped.telefono,
      llegada: this.llegada,
      salida: this.salida,
      huespedes: this.huespedes,
      peticiones: this.huesped.peticiones,
      totalEstimado: this.total,
      noches: this.noches
    });
    this.misReservas = this.reservaService.listar();
    this.paso = 3;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.messageService.add({ severity: 'success', summary: '¡Reserva confirmada!', detail: `Código ${this.confirmada.codigo}` });
  }

  cancelarReserva(codigo: string): void {
    this.reservaService.cancelar(codigo);
    this.misReservas = this.reservaService.listar();
    this.messageService.add({ severity: 'info', summary: 'Reserva cancelada', detail: `Se liberó el código ${codigo}.` });
  }

  nuevaReserva(): void {
    this.paso = 1;
    this.habitacionSel = undefined;
    this.confirmada = undefined;
    this.huesped = { nombre: '', email: '', telefono: '', peticiones: '' };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  formatear(fecha: string): string {
    if (!fecha) return '—';
    return new Date(fecha + 'T12:00:00').toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  }
}
