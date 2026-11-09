# hotel-front

Proyecto Angular **puramente de presentación** (front-end only).  
Extraído y refactorizado desde `angular-proyecto` para separar la maquetación de la lógica de negocio y la conexión con el backend.

## Instalar y correr

```bash
npm install
npm start        # http://localhost:4200
```

---

## Estructura del proyecto

```
src/app/
│
├── models/                        ← Interfaces TypeScript (contratos de datos)
│   ├── habitacion.model.ts        ← Habitacion, HabitacionConTag
│   └── servicio.model.ts          ← Servicio
│
├── components/                    ← Componentes reutilizables (dumb/presentación)
│   ├── layout/                    ← Shell: navbar + sidebar + router-outlet
│   ├── habitacion-card/           ← Card de habitación con @Input y @Output
│   └── servicio-card/             ← Card de servicio con @Input
│
└── pages/                         ← Páginas (smart components — coordinan datos)
    ├── home/                      ← Landing con banner y testimonios
    ├── habitaciones/              ← Grid de habitaciones — usa HabitacionCardComponent
    ├── servicios/                 ← Grid de servicios — usa ServicioCardComponent
    └── contacto/                  ← Datos de contacto
```

---

## Patrón de comunicación padre → hijo → padre

```
HabitacionesComponent (padre / smart)
  │
  │  [habitacion]="item"          ← @Input: pasa los datos
  │  (reservar)="onReservar($event)"    ← @Output: recibe el id
  │  (verDetalles)="onVerDetalles($event)"  ← @Output: recibe el objeto
  ▼
HabitacionCardComponent (hijo / dumb)
  │── muestra la card visualmente
  │── maneja el dialog de detalles internamente
  └── emite eventos al padre sin conocer la lógica de negocio
```

---

## Cómo conectar el backend en el futuro

1. Agrega `provideHttpClient()` en `app.config.ts`
2. Crea un `HabitacionService` en `src/app/services/`
3. En `HabitacionesComponent.ngOnInit()` reemplaza los datos mock con la llamada HTTP:

```typescript
// Reemplazar esto:
const dataMock: Habitacion[] = [ ... ];
this.habitaciones = this.mapearHabitaciones(dataMock);

// Por esto:
this.habitacionService.getAll().subscribe(data => {
  this.habitaciones = this.mapearHabitaciones(data);
});
```

Los componentes hijos (`HabitacionCardComponent`) **no necesitan ningún cambio**.

---

## Dependencias principales

| Paquete | Versión |
|---------|---------|
| Angular | ^19.2.0 |
| PrimeNG | ^19.1.4 |
| PrimeIcons | ^7.0.0 |
| @primeuix/themes (Aura) | ^0.5.0 |
| RxJS | ~7.8.0 |
