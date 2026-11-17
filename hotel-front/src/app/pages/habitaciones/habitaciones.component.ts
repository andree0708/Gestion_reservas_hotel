import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { HabitacionCardComponent } from '../../components/habitacion-card/habitacion-card.component';
import { HabitacionConTag } from '../../models/habitacion.model';
import { HABITACIONES_DATA, mapearHabitaciones } from '../../data/hotel.data';

type Orden = 'recomendado' | 'precio-asc' | 'precio-desc' | 'rating';

@Component({
  selector: 'app-habitaciones',
  imports: [CommonModule, FormsModule, HabitacionCardComponent, ToastModule],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css',
  providers: [MessageService]
})
export class HabitacionesComponent implements OnInit {
  todas: HabitacionConTag[] = [];
  filtradas: HabitacionConTag[] = [];

  // Filtros
  busqueda = '';
  tipoSel = 'Todos';
  huespedesMin = 1;
  precioMax = 700;
  soloOfertas = false;
  orden: Orden = 'recomendado';

  tipos = ['Todos', 'Individual', 'Doble', 'Familiar', 'Suite', 'Presidencial'];

  constructor(private messageService: MessageService, private router: Router) {}

  ngOnInit(): void {
    this.todas = mapearHabitaciones(HABITACIONES_DATA);
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let r = [...this.todas];
    if (this.busqueda.trim()) {
      const q = this.busqueda.toLowerCase();
      r = r.filter(h => (h.nombre + h.descripcion + h.tipo).toLowerCase().includes(q));
    }
    if (this.tipoSel !== 'Todos') r = r.filter(h => h.tipo === this.tipoSel);
    r = r.filter(h => h.capacidad >= this.huespedesMin && h.precio <= this.precioMax);
    if (this.soloOfertas) r = r.filter(h => h.precioTachado);
    switch (this.orden) {
      case 'precio-asc': r.sort((a, b) => a.precio - b.precio); break;
      case 'precio-desc': r.sort((a, b) => b.precio - a.precio); break;
      case 'rating': r.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); break;
    }
    this.filtradas = r;
  }

  limpiar(): void {
    this.busqueda = ''; this.tipoSel = 'Todos';
    this.huespedesMin = 1; this.precioMax = 700;
    this.soloOfertas = false; this.orden = 'recomendado';
    this.aplicarFiltros();
  }

  onReservar(habitacionId: number): void {
    this.router.navigate(['/reserva'], { queryParams: { habitacion: habitacionId } });
  }

  onVerDetalles(habitacion: HabitacionConTag): void {
    console.log('Ver detalles:', habitacion.nombre);
  }
}
