import { BookOpen, FlaskConical, Landmark, Palette, type LucideIcon } from 'lucide-react'

export interface ComparedWork
{
    title: string
    author: string
    date: string
    image: string
    imageAlt: string
    /** Punto de la imagen que debe quedar visible (CSS object-position) */
    focus?: string
}

export interface Consequence
{
    id: string
    tab: string
    title: string
    icon: LucideIcon
    summary: string
    /** Matiz histórico: qué continuó o qué no cambió de golpe */
    nuance: string
    before: ComparedWork
    after: ComparedWork
}

const BASE = '/images/consequences'

export const CONSEQUENCES: Consequence[] = [
    {
        id: 'arte',
        tab: 'Arte',
        title: 'Arte y representación',
        icon: Palette,
        summary:
            'Se pasó de una representación simbólica y religiosa, con fondos dorados, a una visión más humana y realista, con mayor atención a la anatomía, la proporción, la perspectiva y los temas de la Antigüedad clásica.',
        nuance:
            'El arte religioso no desapareció: siguió siendo el principal encargo de la época, pero pintado con nuevas técnicas.',
        before: {
            title: 'Maestà de Santa Trinita',
            author: 'Cimabue',
            date: 'c. 1280–1290',
            image: `${BASE}/art_before.webp`,
            imageAlt: 'Maestà de Santa Trinita, de Cimabue',
            focus: 'center 30%',
        },
        after: {
            title: 'El nacimiento de Venus',
            author: 'Sandro Botticelli',
            date: 'c. 1485',
            image: `${BASE}/art_after.webp`,
            imageAlt: 'El nacimiento de Venus, de Sandro Botticelli',
            focus: '55% center',
        },
    },
    {
        id: 'conocimiento',
        tab: 'Conocimiento',
        title: 'Circulación del conocimiento',
        icon: BookOpen,
        summary:
            'La copia manual de libros, lenta y costosa, dio paso a la imprenta de tipos móviles, que multiplicó la producción de textos y permitió que las ideas circularan más rápido por Europa.',
        nuance: 'Los manuscritos siguieron produciéndose durante décadas junto a los libros impresos.',
        before: {
            title: 'Manuscrito medieval iluminado',
            author: 'Copia manuscrita',
            date: 'siglos XIII–XIV',
            image: `${BASE}/knowledge_before.webp`,
            imageAlt: 'Página de un manuscrito medieval iluminado',
            focus: 'center 40%',
        },
        after: {
            title: 'Biblia de Gutenberg',
            author: 'Johannes Gutenberg',
            date: 'c. 1454–1455',
            image: `${BASE}/knowledge_after.webp`,
            imageAlt: 'Biblia de Gutenberg abierta',
        },
    },
    {
        id: 'ciencia',
        tab: 'Ciencia',
        title: 'Ciencia y observación',
        icon: FlaskConical,
        summary:
            'Las ilustraciones esquemáticas, basadas en autoridades antiguas, dieron paso a representaciones detalladas del cuerpo, apoyadas en la disección y la observación directa.',
        nuance:
            'La anatomía ya se estudiaba en las universidades medievales: el cambio fue de método y de precisión, no un comienzo desde cero.',
        before: {
            title: 'Ilustración anatómica medieval',
            author: 'Manuscrito médico',
            date: 'siglos XIII–XV',
            image: `${BASE}/science_before.webp`,
            imageAlt: 'Ilustración anatómica de un manuscrito médico medieval',
        },
        after: {
            title: 'De humani corporis fabrica',
            author: 'Andrés Vesalio',
            date: '1543',
            image: `${BASE}/science_after.webp`,
            imageAlt: 'Láminas de esqueletos de la Fabrica de Vesalio',
        },
    },
    {
        id: 'politica',
        tab: 'Política',
        title: 'Pensamiento político',
        icon: Landmark,
        summary:
            'Frente a la imagen tradicional de la autoridad del rey, sostenida por la tradición y la religión, surgió un análisis del poder basado en la historia, la experiencia y la estabilidad del Estado.',
        nuance:
            'Es un cambio en la forma de pensar el poder, no la sustitución inmediata de un sistema político por otro.',
        before: {
            title: 'Rey y corte medieval',
            author: 'Miniatura de un manuscrito',
            date: 'Edad Media',
            image: `${BASE}/politics_before.webp`,
            imageAlt: 'Miniatura medieval de un rey con su corte',
        },
        after: {
            title: 'El príncipe',
            author: 'Nicolás Maquiavelo',
            date: 'escrito en 1513, publicado en 1532',
            image: `${BASE}/politics_after.webp`,
            imageAlt: 'Portada de una edición de 1532 de El príncipe',
            focus: 'center 30%',
        },
    },
]
