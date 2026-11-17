import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

/**
 * LayoutComponent — Componente estructural principal
 * Contiene el navbar de navegación y el router-outlet.
 * Gestiona el estado del menú lateral para móviles.
 */
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonModule, ToastModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  /** Controla la visibilidad del menú lateral en pantallas pequeñas */
  sidebarVisible = false;

  /** Nombre del hotel mostrado en el navbar */
  readonly hotelNombre = 'Hotel Tropical';

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  closeSidebar(): void {
    this.sidebarVisible = false;
  }
}
