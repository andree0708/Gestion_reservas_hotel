import { Injectable } from '@angular/core';
import { Reserva } from '../models/habitacion.model';

/**
 * ReservaService — persistencia 100% front-end con localStorage.
 * Guarda reservas y mensajes de contacto sin necesidad de backend.
 */
@Injectable({ providedIn: 'root' })
export class ReservaService {
  private readonly KEY = 'ht_reservas';
  private readonly CONTACT_KEY = 'ht_contactos';
  private readonly SEARCH_KEY = 'ht_ultima_busqueda';

  private leer<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch { return fallback; }
  }

  private guardar(key: string, value: unknown): void {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* noop */ }
  }

  listar(): Reserva[] {
    return this.leer<Reserva[]>(this.KEY, []);
  }

  crear(r: Omit<Reserva, 'codigo' | 'creadaEn'>): Reserva {
    const fecha = new Date();
    const codigo = 'HT-' + fecha.getFullYear().toString().slice(2)
      + String(fecha.getMonth() + 1).padStart(2, '0')
      + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
    const reserva: Reserva = { ...r, codigo, creadaEn: fecha.toISOString() };
    const todas = this.listar();
    todas.unshift(reserva);
    this.guardar(this.KEY, todas);
    return reserva;
  }

  cancelar(codigo: string): void {
    this.guardar(this.KEY, this.listar().filter(r => r.codigo !== codigo));
  }

  guardarBusqueda(b: { llegada: string; salida: string; huespedes: number }): void {
    this.guardar(this.SEARCH_KEY, b);
  }

  leerBusqueda(): { llegada: string; salida: string; huespedes: number } | null {
    return this.leer(this.SEARCH_KEY, null);
  }

  guardarMensaje(m: object): void {
    const todos = this.leer<object[]>(this.CONTACT_KEY, []);
    todos.unshift({ ...m, fecha: new Date().toISOString() });
    this.guardar(this.CONTACT_KEY, todos);
  }

  nochesEntre(llegada: string, salida: string): number {
    if (!llegada || !salida) return 1;
    const ms = new Date(salida).getTime() - new Date(llegada).getTime();
    return Math.max(1, Math.round(ms / 86400000));
  }

  hoyMas(dias: number): string {
    const d = new Date();
    d.setDate(d.getDate() + dias);
    return d.toISOString().slice(0, 10);
  }
}
