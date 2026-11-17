import { Habitacion, HabitacionConTag } from '../models/habitacion.model';
import { Servicio } from '../models/servicio.model';

const U = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const HERO_IMG = U('photo-1566073771259-6a8506099945', 1920);
export const HOTEL_FACHADA = U('photo-1542314831-068cd1dbfeeb');
export const LOBBY_IMG = U('photo-1590490360182-c33d57733427');
export const PISCINA_IMG = U('photo-1571896349842-33c89424de2d');
export const PLAYA_IMG = U('photo-1507525428034-b723cf961d3e', 1400);
export const SPA_IMG = U('photo-1544161515-4ab6ce6db874');
export const RESTAURANTE_IMG = U('photo-1414235077428-338989a2e8c0');
export const GYM_IMG = U('photo-1534438327276-14e5300c3a48');
export const DESAYUNO_IMG = U('photo-1533089860892-a7c6f0a88666');

export const HABITACIONES_DATA: Habitacion[] = [
  {
    id: 1,
    nombre: 'Esencial Individual',
    tipo: 'Individual',
    descripcion: 'Refugio acogedor para viajeros en solitario, con luz natural, escritorio de trabajo y desayuno artesanal incluido.',
    descripcionLarga: 'Pensada para el viajero contemporáneo: cama queen de 160 cm, ducha lluvia con agua caliente solar, escritorio de madera maciza frente al jardín interior y desayuno caribeño servido en el restaurante cada mañana.',
    precio: 80, precioTachado: 99, capacidad: 1,
    tamano: '24 m²', cama: 'Queen 160 cm', disponible: true,
    rating: 4.7, opiniones: 128,
    imagenUrl: U('photo-1590490360182-c33d57733427'),
    galeria: [U('photo-1590490360182-c33d57733427'), U('photo-1591088398332-8a7791972843'), U('photo-1611892440504-42a792e24d32')],
    amenities: ['wifi', 'desayuno', 'aire', 'tv', 'caja', 'ducha']
  },
  {
    id: 2,
    nombre: 'Jardín Doble',
    tipo: 'Doble',
    descripcion: 'Hasta 4 personas con balcón privado frente a los jardines tropicales. La favorita de las familias.',
    descripcionLarga: 'Amplia estancia con cama king y dos individuales, balcón con hamaca frente al jardín de palmas, minibar con frutas de estación y baño de mármol con doble lavamanos.',
    precio: 150, precioTachado: 185, capacidad: 4,
    tamano: '38 m²', cama: 'King + 2 individuales', disponible: true,
    rating: 4.9, opiniones: 342,
    imagenUrl: U('photo-1611892440504-42a792e24d32'),
    galeria: [U('photo-1611892440504-42a792e24d32'), U('photo-1566665797739-1674de7a421a'), U('photo-1598928506319-c55ded91a20c')],
    amenities: ['wifi', 'desayuno', 'balcon', 'piscina', 'aire', 'tv', 'minibar', 'caja']
  },
  {
    id: 3,
    nombre: 'Suite Horizonte',
    tipo: 'Suite',
    descripcion: 'Lujo frente al mar con jacuzzi privado, terraza panorámica y servicio VIP las 24 horas.',
    descripcionLarga: 'Nuestra firma: 68 m² con sala de estar, terraza de 20 m² sobre el Caribe, jacuzzi al atardecer, cama king con dosel, cafetera espresso, amenidades L\'Occitane y mayordomo dedicado.',
    precio: 300, precioTachado: 360, capacidad: 2,
    tamano: '68 m² + terraza', cama: 'King con dosel', disponible: true,
    rating: 5.0, opiniones: 210,
    imagenUrl: U('photo-1582719478250-c89cae4dc85b'),
    galeria: [U('photo-1582719478250-c89cae4dc85b'), U('photo-1596394516093-501ba68a0ba6'), U('photo-1578683010236-d716f9a3f461')],
    amenities: ['wifi', 'jacuzzi', 'terraza', 'vista-mar', 'roomservice', 'minibar', 'aire', 'tv', 'caja', 'bata']
  },
  {
    id: 4,
    nombre: 'Familiar Caribe',
    tipo: 'Familiar',
    descripcion: 'Dos ambientes conectados, litera para niños y sala de juegos. Vacaciones sin fricción para todos.',
    descripcionLarga: 'Dos habitaciones comunicadas: principal con king y secundaria con literas temáticas marinas, zona de juegos con consola, cocina equipada y lavandería. Acceso directo a la piscina familiar.',
    precio: 210, precioTachado: 250, capacidad: 5,
    tamano: '52 m²', cama: 'King + literas', disponible: true,
    rating: 4.8, opiniones: 187,
    imagenUrl: U('photo-1566665797739-1674de7a421a'),
    galeria: [U('photo-1566665797739-1674de7a421a'), U('photo-1598928506319-c55ded91a20c'), U('photo-1591088398332-8a7791972843')],
    amenities: ['wifi', 'desayuno', 'cocina', 'piscina', 'aire', 'tv', 'caja', 'juegos']
  },
  {
    id: 5,
    nombre: 'Balcón Colonial',
    tipo: 'Doble',
    descripcion: 'Encanto cartagenero: balcón de madera sobre la calle empedrada, hamaca y atardeceres de película.',
    descripcionLarga: 'En el ala histórica restaurada de 1890: muros de cal, balcón corrido de madera con mecedoras, cama queen de cuatro postes, ducha de piedra coralina y desayuno servido en el balcón si lo deseas.',
    precio: 135, capacidad: 2,
    tamano: '30 m²', cama: 'Queen cuatro postes', disponible: true,
    rating: 4.8, opiniones: 256,
    imagenUrl: U('photo-1591088398332-8a7791972843'),
    galeria: [U('photo-1591088398332-8a7791972843'), U('photo-1590490360182-c33d57733427'), U('photo-1611892440504-42a792e24d32')],
    amenities: ['wifi', 'desayuno', 'balcon', 'aire', 'tv', 'caja']
  },
  {
    id: 6,
    nombre: 'Presidencial Tropical',
    tipo: 'Presidencial',
    descripcion: 'La cima del hotel: 120 m², piscina privada, chef dedicado y traslados en yate por la bahía.',
    descripcionLarga: 'Toda una planta para ti: tres suites, comedor para ocho, piscina infinita privada al atardecer, chef y sommelier dedicados, traslados en yate, spa in-suite y check-in privado. Solo una por hotel.',
    precio: 650, precioTachado: 790, capacidad: 6,
    tamano: '120 m²', cama: '3 × King', disponible: true,
    rating: 5.0, opiniones: 64,
    imagenUrl: U('photo-1578683010236-d716f9a3f461'),
    galeria: [U('photo-1578683010236-d716f9a3f461'), U('photo-1582719478250-c89cae4dc85b'), U('photo-1596394516093-501ba68a0ba6')],
    amenities: ['wifi', 'piscina-priv', 'chef', 'yate', 'jacuzzi', 'terraza', 'vista-mar', 'roomservice', 'minibar', 'bata', 'caja']
  }
];

export function mapearHabitaciones(data: Habitacion[]): HabitacionConTag[] {
  return data.map(h => {
    let tag = 'Selección casa';
    let tagSeverity: HabitacionConTag['tagSeverity'] = 'info';
    if (h.tipo === 'Suite' || h.tipo === 'Presidencial') { tag = h.tipo === 'Presidencial' ? 'Firma Tropical' : 'Lujo'; tagSeverity = 'warn'; }
    else if (h.tipo === 'Doble' || h.tipo === 'Familiar') { tag = 'Más popular'; tagSeverity = 'success'; }
    else { tag = 'Escapada'; tagSeverity = 'info'; }
    return { ...h, tag, tagSeverity };
  });
}

export const AMENITY_LABELS: Record<string, { icon: string; label: string }> = {
  'wifi': { icon: 'pi pi-wifi', label: 'Wi-Fi fibra' },
  'desayuno': { icon: 'pi pi-heart', label: 'Desayuno incluido' },
  'aire': { icon: 'pi pi-slack', label: 'Clima individual' },
  'tv': { icon: 'pi pi-desktop', label: 'Smart TV 55"' },
  'caja': { icon: 'pi pi-lock', label: 'Caja fuerte' },
  'ducha': { icon: 'pi pi-sparkles', label: 'Ducha lluvia' },
  'balcon': { icon: 'pi pi-sun', label: 'Balcón privado' },
  'piscina': { icon: 'pi pi-flag', label: 'Acceso piscina' },
  'minibar': { icon: 'pi pi-shopping-bag', label: 'Minibar' },
  'jacuzzi': { icon: 'pi pi-star', label: 'Jacuzzi privado' },
  'terraza': { icon: 'pi pi-compass', label: 'Terraza' },
  'vista-mar': { icon: 'pi pi-eye', label: 'Vista al mar' },
  'roomservice': { icon: 'pi pi-bell', label: 'Room service 24h' },
  'bata': { icon: 'pi pi-gift', label: 'Batas premium' },
  'cocina': { icon: 'pi pi-home', label: 'Cocina equipada' },
  'juegos': { icon: 'pi pi-palette', label: 'Zona juegos' },
  'piscina-priv': { icon: 'pi pi-flag', label: 'Piscina privada' },
  'chef': { icon: 'pi pi-shop', label: 'Chef dedicado' },
  'yate': { icon: 'pi pi-send', label: 'Traslado en yate' }
};

export const SERVICIOS_DATA: Servicio[] = [
  { titulo: 'Desayuno Caribeño', descripcion: 'Arepa de huevo, frutas de estación, café de origen y estação de jugos prensados cada mañana.', imagen: DESAYUNO_IMG, icono: 'pi pi-heart', horario: '6:30 – 10:30', etiqueta: 'Incluido' },
  { titulo: 'Piscina Infinita', descripcion: 'Dos piscinas —familiar y solo adultos— con vista al jardín tropical y bar en el agua.', imagen: PISCINA_IMG, icono: 'pi pi-flag', horario: '7:00 – 21:00', etiqueta: 'Destacado' },
  { titulo: 'Spa & Bienestar', descripcion: 'Masajes con cacao, temazcal caribeño, yoga al amanecer y circuito de hidroterapia.', imagen: SPA_IMG, icono: 'pi pi-sparkles', horario: '9:00 – 20:00', etiqueta: 'Reserva previa' },
  { titulo: 'Restaurante Candela', descripcion: 'Cocina de autor caribeña con pesca del día, carta de vinos y cenas bajo las estrellas.', imagen: RESTAURANTE_IMG, icono: 'pi pi-shop', horario: '12:00 – 23:00', etiqueta: 'Chef invitado' },
  { titulo: 'Gimnasio 24h', descripcion: 'Equipos Technogym, clases de crossfit playero y entrenadores certificados.', imagen: GYM_IMG, icono: 'pi pi-bolt', horario: '24 horas', etiqueta: 'Incluido' },
  { titulo: 'Playa Privada', descripcion: 'Sombrillas, toallas frías, kayak y paddle surf con traslados cada 30 minutos.', imagen: PLAYA_IMG, icono: 'pi pi-compass', horario: '8:00 – 18:00', etiqueta: 'Traslado gratis' }
];

export const GALERIA_IMGS = [
  { src: HERO_IMG, titulo: 'Piscina al atardecer' },
  { src: U('photo-1582719478250-c89cae4dc85b'), titulo: 'Suite Horizonte' },
  { src: RESTAURANTE_IMG, titulo: 'Restaurante Candela' },
  { src: SPA_IMG, titulo: 'Spa Tropical' },
  { src: U('photo-1611892440504-42a792e24d32'), titulo: 'Jardín Doble' },
  { src: PLAYA_IMG, titulo: 'Playa privada' },
  { src: HOTEL_FACHADA, titulo: 'Fachada colonial' },
  { src: U('photo-1578683010236-d716f9a3f461'), titulo: 'Presidencial Tropical' }
];
