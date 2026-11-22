import { BookOpen, Castle, Coins, Palette, type LucideIcon } from 'lucide-react'

export type CauseType = 'interna' | 'externa'

export interface Cause
{
    id: string
    title: string
    type: CauseType
    description: string
    icon: LucideIcon
    image: string
    imageAlt: string
    position: {
        left: number
        top: number
        width: number
        rotate: number
    }
    cardSide: 'left' | 'right'
}

export const CAUSES: Cause[] = [
    {
        id: 'humanismo',
        title: 'Humanismo',
        type: 'interna',
        description:
            'Movimiento intelectual que revalorizó al ser humano y sus capacidades. Los humanistas, como Petrarca, buscaron y estudiaron los textos de la Antigüedad clásica.',
        icon: BookOpen,
        image: '/images/causes/hombre_vitruvio.webp',
        imageAlt: 'Hombre de Vitruvio, de Leonardo da Vinci',
        position: { left: 12, top: 4, width: 25, rotate: -6 },
        cardSide: 'right',
    },
    {
        id: 'comercio',
        title: 'Comercio y banca',
        type: 'interna',
        description:
            'Las ciudades italianas se enriquecieron con el comercio mediterráneo y la banca. El florín de oro de Florencia, acuñado desde 1252, circuló por toda Europa.',
        icon: Coins,
        image: '/images/causes/moneda_florentina.webp',
        imageAlt: 'Florín de oro de Florencia',
        position: { left: 66, top: 12, width: 17, rotate: 8 },
        cardSide: 'left',
    },
    {
        id: 'mecenazgo',
        title: 'Mecenazgo',
        type: 'interna',
        description:
            'Familias poderosas como los Médici financiaron a artistas, arquitectos y humanistas, y usaron el arte como muestra de prestigio y poder político.',
        icon: Palette,
        image: '/images/causes/escudo_medici.webp',
        imageAlt: 'Escudo de armas de la familia Médici',
        position: { left: 22, top: 50, width: 16, rotate: -3 },
        cardSide: 'right',
    },
    {
        id: 'ciudades',
        title: 'Ciudades-Estado',
        type: 'interna',
        description:
            'Italia estaba dividida en ciudades-Estado autónomas, como Florencia, Venecia y Milán. Su rivalidad estimuló la inversión en arte, arquitectura y conocimiento.',
        icon: Castle,
        image: '/images/causes/mapa_florencia.webp',
        imageAlt: 'Plano antiguo de Florencia',
        position: { left: 48, top: 47, width: 36, rotate: 4 },
        cardSide: 'left',
    },
]
