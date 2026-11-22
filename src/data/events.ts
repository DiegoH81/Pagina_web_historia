export interface HistoricalEvent
{
    id: string
    date: string
    title: string
    shortTitle: string
    description: string
    place: string
    image: string
    imageAlt: string
    focus?: string
}

const BASE = '/images/events'

export const EVENTS: HistoricalEvent[] = [
    {
        id: 'baptisterio',
        date: '1401',
        title: 'El concurso del Baptisterio',
        shortTitle: 'El concurso del Baptisterio',
        description:
            'Florencia convoca un concurso para las puertas de bronce de su Baptisterio. Lorenzo Ghiberti vence a Filippo Brunelleschi y trabaja en ellas durante más de veinte años.',
        place: 'Florencia',
        image: `${BASE}/01-baptisterio-florencia.webp`,
        imageAlt: 'Baptisterio de San Juan, en Florencia',
        focus: '60% center',
    },
    {
        id: 'cupula',
        date: '1420–1436',
        title: 'La cúpula de Brunelleschi',
        shortTitle: 'La cúpula de Brunelleschi',
        description:
            'Brunelleschi levanta la cúpula de la catedral de Florencia con una técnica nueva, sin la gran cimbra de madera tradicional. Se convierte en el símbolo de la ciudad.',
        place: 'Florencia',
        image: `${BASE}/02-cupula-brunelleschi.webp`,
        imageAlt: 'Vista de Florencia con la cúpula de Santa Maria del Fiore',
    },
    {
        id: 'cosme',
        date: '1434',
        title: 'Cosme de Médici en Florencia',
        shortTitle: 'Cosme de Médici en Florencia',
        description:
            'Cosme de Médici regresa del exilio y pasa a dominar la vida política de Florencia. Su familia se convierte en el gran mecenas de artistas y humanistas.',
        place: 'Florencia',
        image: `${BASE}/03-cosme-medici-representacion.webp`,
        imageAlt: 'Representación posterior de los Médici rodeados de artistas',
    },
    {
        id: 'venus',
        date: 'c. 1485',
        title: 'El nacimiento de Venus',
        shortTitle: 'El nacimiento de Venus',
        description:
            'Sandro Botticelli pinta esta obra, que expresa el renovado interés por la Antigüedad clásica y la belleza ideal del humanismo renacentista.',
        place: 'Florencia',
        image: `${BASE}/04-nacimiento-venus-botticelli.webp`,
        imageAlt: 'El nacimiento de Venus, de Sandro Botticelli',
        focus: '70% center',
    },
    {
        id: 'david',
        date: '1501–1504',
        title: 'El David de Miguel Ángel',
        shortTitle: 'El David de Miguel Ángel',
        description:
            'Miguel Ángel talla el David en un solo bloque de mármol. La escultura se convierte en un símbolo de la república florentina y del ideal del cuerpo humano.',
        place: 'Florencia',
        image: `${BASE}/05-david-miguel-angel.webp`,
        imageAlt: 'El David de Miguel Ángel',
        focus: '65% center',
    },
    {
        id: 'san-pedro',
        date: '1506',
        title: 'La nueva basílica de San Pedro',
        shortTitle: 'La nueva basílica de San Pedro',
        description:
            'El papa Julio II encarga a Bramante una nueva basílica de San Pedro. Las obras durarán más de un siglo y participarán arquitectos como Miguel Ángel.',
        place: 'Roma',
        image: `${BASE}/06-basilica-san-pedro-interior.webp`,
        imageAlt: 'Interior de la basílica de San Pedro',
    },
    {
        id: 'sixtina',
        date: '1508–1512',
        title: 'La bóveda de la Capilla Sixtina',
        shortTitle: 'La bóveda de la Capilla Sixtina',
        description:
            'Por encargo de Julio II, Miguel Ángel pinta la bóveda de la Capilla Sixtina con escenas del Génesis, una de las obras cumbre del Renacimiento.',
        place: 'Roma',
        image: `${BASE}/07-boveda-capilla-sixtina.webp`,
        imageAlt: 'Bóveda de la Capilla Sixtina',
    },
    {
        id: 'saqueo',
        date: '1527',
        title: 'El saqueo de Roma',
        shortTitle: 'El saqueo de Roma',
        description:
            'Las tropas del emperador Carlos V saquean Roma. El golpe dispersa a artistas y humanistas y suele considerarse el fin del esplendor romano del Renacimiento.',
        place: 'Roma',
        image: `${BASE}/08-saqueo-roma-representacion.webp`,
        imageAlt: 'Representación pictórica de un saqueo de Roma',
    },
]
