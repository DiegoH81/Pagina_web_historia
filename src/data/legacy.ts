export type PlaceType = 'origen' | 'europa' | 'america'

export interface LegacyPlace
{
    id: string
    name: string
    type: PlaceType
    x: number
    y: number
    labelSide: 'left' | 'right'
    minor?: boolean
    image: string
    imageAlt: string
    description: string
    highlights: string
}

const BASE = '/images/legacy'

export const EUROPE_FOCUS = { x: 56.5, y: 30.5, zoom: 3 }

export const MAP_IMAGE = `${BASE}/renaissance_world_map.webp`

export const TYPE_LABELS: Record<PlaceType, string> = {
    origen: 'Punto de origen',
    europa: 'Difusión en Europa',
    america: 'Llegada a América',
}

export const PLACES: LegacyPlace[] = [
    {
        id: 'florencia',
        name: 'Florencia',
        type: 'origen',
        x: 58.0,
        y: 32.7,
        labelSide: 'right',
        image: `${BASE}/florence.webp`,
        imageAlt: 'Florencia con la cúpula de Santa Maria del Fiore',
        description:
            'Centro del Renacimiento, donde surgieron nuevas ideas artísticas, científicas y humanistas que se difundieron por Europa y, más tarde, por América.',
        highlights: 'Arte, humanismo, mecenazgo y nuevos métodos de conocimiento.',
    },
    {
        id: 'roma',
        minor: true,
        name: 'Roma',
        type: 'origen',
        x: 58.8,
        y: 33.9,
        labelSide: 'right',
        image: `${BASE}/rome.webp`,
        imageAlt: 'Vista de Roma',
        description:
            'En el siglo XVI, el mecenazgo de los papas convirtió a Roma en el gran centro artístico de Europa, con obras de Miguel Ángel, Rafael y Bramante.',
        highlights: 'Arquitectura monumental, pintura y mecenazgo de la Iglesia.',
    },
    {
        id: 'paris',
        minor: true,
        name: 'París',
        type: 'europa',
        x: 55.4,
        y: 30.1,
        labelSide: 'left',
        image: `${BASE}/paris.webp`,
        imageAlt: 'Vista de París',
        description:
            'Las guerras de Italia acercaron a Francia al arte italiano. Francisco I protegió a artistas y humanistas, e invitó a Leonardo da Vinci a su corte en 1516.',
        highlights: 'Mecenazgo real, arquitectura de castillos y humanismo francés.',
    },
    {
        id: 'londres',
        minor: true,
        name: 'Londres',
        type: 'europa',
        x: 53.5,
        y: 29.0,
        labelSide: 'left',
        image: `${BASE}/london.webp`,
        imageAlt: 'Vista de Londres',
        description:
            'El humanismo llegó a Inglaterra a través de figuras como Tomás Moro, autor de Utopía (1516), y del contacto con Erasmo de Róterdam.',
        highlights: 'Humanismo cristiano, pensamiento político y literatura.',
    },
    {
        id: 'amberes',
        minor: true,
        name: 'Amberes',
        type: 'europa',
        x: 55.8,
        y: 28.6,
        labelSide: 'right',
        image: `${BASE}/antwerp.webp`,
        imageAlt: 'Vista de Amberes',
        description:
            'Gran puerto comercial del norte de Europa en el siglo XVI y centro editorial, con imprentas como la de Christophe Plantin.',
        highlights: 'Comercio, imprenta y pintura flamenca.',
    },
    {
        id: 'nuremberg',
        minor: true,
        name: 'Núremberg',
        type: 'europa',
        x: 57.3,
        y: 30.3,
        labelSide: 'right',
        image: `${BASE}/nuremberg.webp`,
        imageAlt: 'Vista de Núremberg',
        description:
            'Ciudad de artesanos e impresores. Alberto Durero, que viajó a Italia, unió las ideas italianas con la tradición alemana.',
        highlights: 'Grabado, imprenta y estudio de la proporción.',
    },
    {
        id: 'mexico',
        name: 'Ciudad de México',
        type: 'america',
        x: 25.3,
        y: 42.2,
        labelSide: 'left',
        image: `${BASE}/mexico_city.webp`,
        imageAlt: 'Vista de la Ciudad de México',
        description:
            'Tras la conquista, llegaron formas europeas de arquitectura, educación e imprenta. En 1539 se instaló aquí la primera imprenta de América.',
        highlights: 'Imprenta, universidad y arquitectura de influencia europea.',
    },
    {
        id: 'arequipa',
        name: 'Arequipa',
        type: 'america',
        x: 31.5,
        y: 58.0,
        labelSide: 'left',
        image: `${BASE}/arequipa.webp`,
        imageAlt: 'Vista de Arequipa',
        description:
            'Fundada en 1540 con un trazado en damero. Su arquitectura en sillar combinó formas europeas, entre ellas algunas heredadas del Renacimiento, con la tradición local.',
        highlights: 'Trazado urbano, arquitectura en sillar y mestizaje artístico.',
    },
]

/** Rutas de difusión: siempre parten del primer lugar indicado */
export const ROUTES: [string, string][] = [
    ['florencia', 'paris'],
    ['florencia', 'londres'],
    ['florencia', 'amberes'],
    ['florencia', 'nuremberg'],
    ['florencia', 'mexico'],
    ['florencia', 'arequipa'],
]
