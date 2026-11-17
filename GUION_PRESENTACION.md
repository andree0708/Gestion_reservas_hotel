# Guion de presentación — Hotel Tropical (frontend Angular)

Tiempo sugerido: 8–10 minutos. Orden: idea general → componentes → comunicación → interfaces → servicios → demo en vivo.

---

## 1. Apertura (1 min)

> "Mi proyecto es el frontend del **Hotel Tropical**, un hotel boutique en Cartagena.
> Está hecho en **Angular 19 con componentes standalone y PrimeNG**.
> Es 100% frontend: no hay backend, los datos son mock centralizados y la
> persistencia se hace en el navegador con **localStorage**."

Estructura del proyecto (`src/app`):

```
app/
  components/   → piezas reutilizables (layout, habitacion-card, servicio-card)
  pages/        → pantallas completas (home, habitaciones, servicios, galería, reserva, contacto)
  models/       → interfaces TypeScript (los "contratos" de datos)
  data/         → datos mock centralizados (hotel.data.ts)
  services/     → lógica compartida (reserva.service.ts)
```

## 2. La idea clave: no duplicar información (1 min)

> "La profesora nos pidió no duplicar información: se maqueta el card **una sola vez**
> y después solo se le envía información distinta."

Ejemplo concreto: `HabitacionCardComponent` está maquetado una sola vez en
`components/habitacion-card/`, y se reutiliza en **dos páginas distintas**:

- `home.component.html` → muestra 3 destacadas: `<app-habitacion-card [habitacion]="h" ...>`
- `habitaciones.component.html` → muestra las filtradas con el **mismo** selector.

Si mañana cambia el diseño del card, se cambia en un solo archivo.

## 3. Comunicación entre componentes (2 min, el corazón de la nota)

### De padre a hijo: `@Input` (bajan datos)

```ts
// hijo: habitacion-card.component.ts
@Input({ required: true }) habitacion!: HabitacionConTag;
```

```html
<!-- padre: habitaciones.component.html -->
<app-habitacion-card [habitacion]="h" ...>
```

> "El padre le **pasa el objeto completo** al hijo con property binding `[habitacion]`.
> El hijo no sale a buscar datos: solo renderiza lo que recibe. Eso lo hace reutilizable."

### De hijo a padre: `@Output` + `EventEmitter` (suben eventos)

```ts
// hijo
@Output() reservar = new EventEmitter<number>();
onReservar(): void { this.reservar.emit(this.habitacion.id); }
```

```html
<!-- padre -->
<app-habitacion-card (reservar)="onReservar($event)">
```

> "Cuando el usuario hace clic en Reservar, el hijo **emite un evento** con el id.
> El padre lo escucha con `(reservar)` y decide qué hacer: aquí navega a `/reserva`
> con ese id como query param. El diálogo de detalles, en cambio, lo maneja el
> propio hijo con su variable interna `detalleVisible`, porque al padre no le importa."

### Caso que solo usa `@Input`: `ServicioCardComponent`

> "Este card solo recibe `[servicio]` y no emite nada, porque no tiene botones
> ni acciones: es 100% presentacional. Si un componente no necesita avisar nada
> hacia arriba, no lleva `@Output`."

## 4. Las interfaces: los contratos (1.5 min)

Están en `models/`. Explicar que **una interfaz no crea nada**: solo describe la forma
exacta que debe tener un objeto, y TypeScript avisa si algo no cuadra.

- **`Habitacion`** (`habitacion.model.ts`): `id, nombre, descripcion, tipo, precio, capacidad, rating, imagenUrl, galeria, amenities...`. Es lo que el card espera recibir.
- **`HabitacionConTag`**: extiende a `Habitacion` agregando `tag` y `tagSeverity` (ej. "Más popular", "Lujo"). El **padre** calcula esos valores visuales en `mapearHabitaciones()` para que el hijo no conozca esa lógica.
- **`Servicio`** (`servicio.model.ts`): `titulo, descripcion, imagen, icono, horario, etiqueta`.
- **`Reserva`**: `codigo, habitacionId, nombreHuesped, llegada, salida, totalEstimado...`. Es lo que se guarda al confirmar.

## 5. Servicios y datos (1 min)

- **`hotel.data.ts`**: un solo lugar con las 6 habitaciones, servicios, amenidades y galería. Todas las páginas importan de aquí; nada está copiado en dos archivos.
- **`ReservaService`** (`services/reserva.service.ts`): guarda reservas, mensajes y la última búsqueda en `localStorage`, calcula noches y genera el código (ej. `HT-26-AB3F`).

## 6. Cómo se hizo lo del mapa (30 seg)

> "Angular **bloquea por seguridad** cualquier URL puesta directamente en un `iframe`
> (protección contra XSS). Por eso en `contacto.component.ts` la URL de Google Maps
> se pasa por `DomSanitizer.bypassSecurityTrustResourceUrl(...)`, que le dice a
> Angular: 'esta URL es confiable'. Esa URL sanitizada se enlaza con `[src]` al iframe."

## 7. Pregunta esperada: ¿los mensajes de contacto SE ENVÍAN? (30 seg)

> "No. Como no hay backend, el formulario **valida** (nombre, correo con @ y mensaje
> obligatorios), muestra el toast de confirmación y **guarda el mensaje en
> `localStorage`** con la fecha. Se puede comprobar en DevTools → Application →
> Local Storage → clave `ht_contactos`. Para enviarlos de verdad, habría que
> inyectar `HttpClient` y hacer `POST` a un endpoint del backend; el componente
> ya está separado para que ese cambio sea de una sola línea en el servicio."

## 8. Demo en vivo sugerida (2 min)

1. **Home**: mostrar hero, usar el buscador (elegir fechas → guarda la búsqueda y navega a habitaciones).
2. **Habitaciones**: escribir "jacuzzi" en el filtro, mover el precio, ordenar → abrir **Detalles** (galería interna) → **Reservar** (llega con la habitación preseleccionada por query param).
3. **Reserva**: pasos 1→2→3, confirmar y mostrar el **código HT-**; mostrar "Mis reservas" y cancelar una.
4. **Contacto**: enviar mensaje con campo vacío (muestra el error), luego correcto (muestra el éxito); explicar localStorage.
5. DevTools → Application → Local Storage → mostrar `ht_reservas` y `ht_contactos`.

## 9. Cierre (30 seg)

> "En resumen: componentes separados y reutilizables, comunicación clara
> (`@Input` para bajar datos, `@Output` para subir eventos), interfaces como
> contratos, datos centralizados sin duplicar, y persistencia local mientras
> no haya backend. Gracias, ¿preguntas?"
