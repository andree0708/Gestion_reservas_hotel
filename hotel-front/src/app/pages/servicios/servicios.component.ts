import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicioCardComponent } from '../../components/servicio-card/servicio-card.component';
import { SERVICIOS_DATA } from '../../data/hotel.data';

@Component({
  selector: 'app-servicios',
  imports: [CommonModule, RouterLink, ServicioCardComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  servicios = SERVICIOS_DATA;

  horarios = [
    { lugar: 'Restaurante Candela', hora: '12:00 – 23:00', icon: 'pi pi-shop' },
    { lugar: 'Desayuno caribeño', hora: '6:30 – 10:30', icon: 'pi pi-heart' },
    { lugar: 'Spa Tropical', hora: '9:00 – 20:00', icon: 'pi pi-sparkles' },
    { lugar: 'Piscinas', hora: '7:00 – 21:00', icon: 'pi pi-flag' },
    { lugar: 'Gimnasio', hora: '24 horas', icon: 'pi pi-bolt' },
    { lugar: 'Playa privada', hora: '8:00 – 18:00', icon: 'pi pi-compass' }
  ];
}
