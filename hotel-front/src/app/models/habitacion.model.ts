/**
 * Modelo que representa una habitación / producto de hotel.
 * Esta es la forma del objeto que el componente HabitacionCard espera recibir via @Input.
 */
export interface Habitacion {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: 'Individual' | 'Doble' | 'Suite' | string;
  precio: number;
  capacidad: number;
  disponible?: boolean;
  imagenUrl?: string;
}

/**
 * Modelo extendido con propiedades visuales (tag, severity).
 * El componente padre se encarga de mapear Habitacion → HabitacionConTag.
 */
export interface HabitacionConTag extends Habitacion {
  tag: string;
  tagSeverity: 'success' | 'warn' | 'info' | 'danger';
}
