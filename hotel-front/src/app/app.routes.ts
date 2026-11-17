import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'habitaciones',
        loadComponent: () => import('./pages/habitaciones/habitaciones.component').then(m => m.HabitacionesComponent)
      },
      {
        path: 'servicios',
        loadComponent: () => import('./pages/servicios/servicios.component').then(m => m.ServiciosComponent)
      },
      {
        path: 'galeria',
        loadComponent: () => import('./pages/galeria/galeria.component').then(m => m.GaleriaComponent)
      },
      {
        path: 'reserva',
        loadComponent: () => import('./pages/reserva/reserva.component').then(m => m.ReservaComponent)
      },
      {
        path: 'contacto',
        loadComponent: () => import('./pages/contacto/contacto.component').then(m => m.ContactoComponent)
      },
      // Ruta wildcard: redirige al home
      { path: '**', redirectTo: '' }
    ]
  }
];
