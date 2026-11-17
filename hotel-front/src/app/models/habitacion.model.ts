/**
 * Modelo que representa una habitación / producto de hotel.
 */
export interface Habitacion {
  id: number;
  nombre: string;
  descripcion: string;
  descripcionLarga?: string;
  tipo: 'Individual' | 'Doble' | 'Suite' | 'Familiar' | 'Presidencial' | string;
  precio: number;
  precioTachado?: number;
  capacidad: number;
  tamano?: string;          // ej. "32 m²"
  cama?: string;            // ej. "King + 2 individuales"
  disponible?: boolean;
  rating?: number;
  opiniones?: number;
  imagenUrl?: string;
  galeria?: string[];
  amenities?: string[];     // nombres de amenidades
}

/**
 * Modelo extendido con propiedades visuales (tag, severity).
 */
export interface HabitacionConTag extends Habitacion {
  tag: string;
  tagSeverity: 'success' | 'warn' | 'info' | 'danger';
}

export interface Reserva {
  codigo: string;
  habitacionId: number;
  habitacionNombre: string;
  nombreHuesped: string;
  email: string;
  telefono: string;
  llegada: string;
  salida: string;
  huespedes: number;
  peticiones?: string;
  totalEstimado: number;
  noches: number;
  creadaEn: string;
}
