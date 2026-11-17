# Hotel Tropical — Frontend

Hotel boutique en Cartagena. Aplicación 100% frontend desarrollada en **Angular 19**
con componentes standalone y **PrimeNG**. Sin backend: los datos del hotel viven en
un mock centralizado y lo que el usuario genera (reservas y mensajes) se guarda en
el navegador con **localStorage**.

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Cómo correrlo

```bash
cd hotel-front
npm install
npm start
```

Abrir http://localhost:4200 en el navegador.

## Páginas y rutas

| Ruta            | Página      | Descripción                                              |
|-----------------|-------------|----------------------------------------------------------|
| `/`             | Inicio      | Hero, buscador de fechas, destacadas y testimonios       |
| `/habitaciones` | Habitaciones| Catálogo con filtros, galería y detalles por habitación  |
| `/servicios`    | Servicios   | Servicios del hotel, horarios y experiencias             |
| `/galeria`      | Galería     | Mosaico de fotos con lightbox                            |
| `/reserva`      | Reserva     | Flujo en 3 pasos con código de confirmación              |
| `/contacto`     | Contacto    | Formulario validado, mapa y preguntas frecuentes         |

## Estructura (`src/app`)

```
components/  → piezas reutilizables (layout, habitacion-card, servicio-card)
pages/       → pantallas completas (home, habitaciones, servicios, galería, reserva, contacto)
models/      → interfaces TypeScript (Habitacion, HabitacionConTag, Servicio, Reserva)
data/        → datos mock centralizados (hotel.data.ts)
services/    → lógica compartida (reserva.service.ts, persistencia en localStorage)
```

Regla del proyecto: cada tarjeta se maqueta **una sola vez** y las páginas solo le
envían información (`@Input`); los eventos suben al padre (`@Output`).

## Datos locales (localStorage)

| Clave                | Contenido                          |
|----------------------|------------------------------------|
| `ht_reservas`        | Reservas confirmadas               |
| `ht_contactos`       | Mensajes del formulario            |
| `ht_ultima_busqueda` | Última búsqueda del home           |

Se inspeccionan en DevTools → Application → Local Storage.

## Flujo de trabajo en git

Una rama por funcionalidad (`feature/*`), commits descriptivos en español, pull
requests hacia `develop` y merge. La rama `main` recibe la integración final
mediante PR desde `develop`.

## Pendiente (con backend futuro)

Enviar mensajes y reservas con `HttpClient` (`POST`) a un endpoint real, en lugar
de `localStorage`. Los servicios ya están separados para que el cambio sea mínimo.
