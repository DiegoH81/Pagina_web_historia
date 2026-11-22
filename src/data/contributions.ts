import { BookOpen, Landmark, Orbit, Palette, Scale, ScrollText, type LucideIcon } from 'lucide-react'

export interface Work
{
    id: string
    title: string
    author: string
    date: string
    image: string
    imageAlt: string
    description: string
}

export interface ContributionArea
{
    id: string
    title: string
    icon: LucideIcon
    summary: string
    works: [Work, Work, Work]
}

const BASE = '/images/contributions'

export const CONTRIBUTIONS: ContributionArea[] = [
    {
        id: 'arquitectura',
        title: 'Arquitectura',
        icon: Landmark,
        summary:
            'Los arquitectos del Renacimiento recuperaron las formas de la Antigüedad romana: columnas, arcos de medio punto y cúpulas. Buscaron la proporción, la simetría y la armonía basadas en la geometría.',
        works: [
            {
                id: 'cupula',
                title: 'Cúpula de Santa Maria del Fiore',
                author: 'Filippo Brunelleschi',
                date: '1420–1436',
                image: `${BASE}/arquitectura/cupula_florencia.webp`,
                imageAlt: 'Cúpula de la catedral de Florencia',
                description:
                    'Brunelleschi cubrió el enorme espacio de la catedral de Florencia sin la cimbra de madera tradicional, gracias a una doble cúpula y a un sistema de ladrillos en espiga. Se convirtió en el símbolo de la ciudad.',
            },
            {
                id: 'pazzi',
                title: 'Capilla Pazzi',
                author: 'Filippo Brunelleschi',
                date: 'c. 1430–1460',
                image: `${BASE}/arquitectura/capilla_pazzi.webp`,
                imageAlt: 'Interior de la Capilla Pazzi en Florencia',
                description:
                    'Un espacio pequeño organizado con módulos geométricos simples: cuadrados, círculos y una cúpula central. Es un ejemplo de la claridad y la proporción que buscaba la nueva arquitectura.',
            },
            {
                id: 'tempietto',
                title: 'Tempietto de San Pietro in Montorio',
                author: 'Donato Bramante',
                date: 'c. 1502',
                image: `${BASE}/arquitectura/tempietto.webp`,
                imageAlt: 'Tempietto de Bramante en Roma',
                description:
                    'Templo circular inspirado en los templos de la Antigüedad, con columnas dóricas y una cúpula. Por su perfección se consideró un modelo de la arquitectura clásica renacida.',
            },
        ],
    },
    {
        id: 'humanismo',
        title: 'Humanismo',
        icon: BookOpen,
        summary:
            'Los humanistas estudiaron los textos de la Antigüedad griega y latina y pusieron al ser humano en el centro de la reflexión. Defendieron la educación en gramática, retórica, historia, poesía y filosofía moral.',
        works: [
            {
                id: 'petrarca',
                title: 'Cancionero',
                author: 'Francesco Petrarca',
                date: 's. XIV',
                image: `${BASE}/humanismo/petrarca_canzoniere.webp`,
                imageAlt: 'Miniatura de un manuscrito de Petrarca',
                description:
                    'Petrarca, considerado el padre del humanismo, buscó y copió manuscritos de autores clásicos. Su Cancionero, escrito en lengua vulgar, influyó en la poesía europea durante siglos.',
            },
            {
                id: 'pico',
                title: 'Discurso sobre la dignidad del hombre',
                author: 'Giovanni Pico della Mirandola',
                date: '1486',
                image: `${BASE}/humanismo/pico_dignidad.webp`,
                imageAlt: 'Escudo de armas de la familia Pico',
                description:
                    'Pico defendió que el ser humano tiene la libertad de elegir lo que quiere ser. Es uno de los textos que mejor resume la confianza humanista en las capacidades humanas.',
            },
            {
                id: 'erasmo',
                title: 'Elogio de la locura',
                author: 'Erasmo de Róterdam',
                date: '1511',
                image: `${BASE}/humanismo/erasmo_locura.webp`,
                imageAlt: 'Ejemplar antiguo del Elogio de la locura',
                description:
                    'Sátira en la que la Locura habla en primera persona para criticar los vicios de la sociedad y de la Iglesia. Muestra la expansión del humanismo fuera de Italia.',
            },
        ],
    },
    {
        id: 'arte',
        title: 'Arte',
        icon: Palette,
        summary:
            'El Renacimiento renovó el arte al recuperar la representación de la figura humana, el estudio de la naturaleza y el uso de la perspectiva, logrando un mayor realismo y expresión.',
        works: [
            {
                id: 'gioconda',
                title: 'La Gioconda',
                author: 'Leonardo da Vinci',
                date: 'c. 1503–1519',
                image: `${BASE}/arte/gioconda.webp`,
                imageAlt: 'La Gioconda, de Leonardo da Vinci',
                description:
                    'Leonardo usó el sfumato, una transición suave entre luces y sombras, para dar vida al rostro y fundir la figura con el paisaje. Es uno de los retratos más estudiados de la historia.',
            },
            {
                id: 'atenas',
                title: 'La escuela de Atenas',
                author: 'Rafael',
                date: '1509–1511',
                image: `${BASE}/arte/escuela_atenas.webp`,
                imageAlt: 'La escuela de Atenas, de Rafael',
                description:
                    'Representa el ideal humanista al reunir a grandes pensadores de la Antigüedad, con Platón y Aristóteles en el centro, en un espacio armónico construido con una perspectiva monumental.',
            },
            {
                id: 'venus',
                title: 'El nacimiento de Venus',
                author: 'Sandro Botticelli',
                date: 'c. 1484–1486',
                image: `${BASE}/arte/nacimiento_venus.webp`,
                imageAlt: 'El nacimiento de Venus, de Botticelli',
                description:
                    'Un tema de la mitología clásica pintado a gran escala, algo poco común en la Edad Media. Refleja el interés de los círculos humanistas florentinos por la Antigüedad.',
            },
        ],
    },
    {
        id: 'ciencia',
        title: 'Ciencia',
        icon: Orbit,
        summary:
            'La observación directa y la experiencia empezaron a ganar peso frente a la autoridad de los textos antiguos. La anatomía, la astronomía y el estudio de la naturaleza dieron pasos decisivos.',
        works: [
            {
                id: 'vesalio',
                title: 'De humani corporis fabrica',
                author: 'Andrés Vesalio',
                date: '1543',
                image: `${BASE}/ciencia/vesalio_fabrica.webp`,
                imageAlt: 'Láminas anatómicas de la Fabrica de Vesalio',
                description:
                    'Basado en disecciones realizadas por el propio autor, corrigió errores de Galeno, la autoridad médica antigua. Sus grabados detallados cambiaron la enseñanza de la anatomía.',
            },
            {
                id: 'copernico',
                title: 'De revolutionibus orbium coelestium',
                author: 'Nicolás Copérnico',
                date: '1543',
                image: `${BASE}/ciencia/copernico_revolutionibus.webp`,
                imageAlt: 'Portada de De revolutionibus, de Copérnico',
                description:
                    'Propuso que la Tierra y los planetas giran alrededor del Sol. Este modelo heliocéntrico desafió la visión tradicional y abrió el camino a la revolución científica.',
            },
            {
                id: 'agricola',
                title: 'De re metallica',
                author: 'Georgius Agricola',
                date: '1556',
                image: `${BASE}/ciencia/agricola_metallica.webp`,
                imageAlt: 'Grabado de De re metallica, de Agricola',
                description:
                    'Tratado sobre minería y metalurgia basado en la observación de las técnicas de su tiempo. Sus grabados muestran el interés renacentista por el conocimiento práctico.',
            },
        ],
    },
    {
        id: 'politica',
        title: 'Pensamiento político',
        icon: Scale,
        summary:
            'Los pensadores del Renacimiento analizaron el poder a partir de la historia y la experiencia, y no solo desde la moral religiosa. Reflexionaron sobre el Estado, el gobierno y la sociedad ideal.',
        works: [
            {
                id: 'principe',
                title: 'El príncipe',
                author: 'Nicolás Maquiavelo',
                date: '1513',
                image: `${BASE}/politica/maquiavelo_principe.webp`,
                imageAlt: 'Retrato grabado de Nicolás Maquiavelo',
                description:
                    'Maquiavelo describió cómo se conquista y se conserva el poder, separando el análisis político de los ideales morales tradicionales. Se publicó en 1532, después de su muerte.',
            },
            {
                id: 'discursos',
                title: 'Discursos sobre la primera década de Tito Livio',
                author: 'Nicolás Maquiavelo',
                date: 'c. 1513–1517',
                image: `${BASE}/politica/maquiavelo_discursos.webp`,
                imageAlt: 'Portada de una edición antigua de los Discursos de Maquiavelo',
                description:
                    'A partir de la historia de la República romana, Maquiavelo reflexiona sobre las virtudes de las repúblicas y la participación de los ciudadanos.',
            },
            {
                id: 'utopia',
                title: 'Utopía',
                author: 'Tomás Moro',
                date: '1516',
                image: `${BASE}/politica/moro_utopia.webp`,
                imageAlt: 'Portada de una edición antigua de Utopía',
                description:
                    'Moro imaginó una isla con una sociedad ideal para criticar los problemas de la Inglaterra de su tiempo. La palabra "utopía" nació con esta obra.',
            },
        ],
    },
    {
        id: 'imprenta',
        title: 'Imprenta',
        icon: ScrollText,
        summary:
            'La imprenta de tipos móviles permitió producir libros más rápido y en mayor cantidad. Las ideas humanistas, científicas y religiosas circularon por Europa como nunca antes.',
        works: [
            {
                id: 'gutenberg',
                title: 'Biblia de Gutenberg',
                author: 'Johannes Gutenberg',
                date: 'c. 1455',
                image: `${BASE}/imprenta/biblia_gutenberg.webp`,
                imageAlt: 'Página de la Biblia de Gutenberg',
                description:
                    'Primer gran libro impreso en Europa con tipos móviles metálicos. Demostró que la imprenta podía igualar la calidad de los manuscritos copiados a mano.',
            },
            {
                id: 'nuremberg',
                title: 'Crónica de Núremberg',
                author: 'Hartmann Schedel',
                date: '1493',
                image: `${BASE}/imprenta/cronica_nuremberg.webp`,
                imageAlt: 'Vista de una ciudad en la Crónica de Núremberg',
                description:
                    'Una historia del mundo ilustrada con cientos de grabados de ciudades y personajes. Muestra cómo la imprenta combinó texto e imagen a gran escala.',
            },
            {
                id: 'hypnerotomachia',
                title: 'Hypnerotomachia Poliphili',
                author: 'Aldo Manuzio (impresor)',
                date: '1499',
                image: `${BASE}/imprenta/hypnerotomachia.webp`,
                imageAlt: 'Páginas de la Hypnerotomachia Poliphili',
                description:
                    'Impreso en Venecia por Aldo Manuzio, es célebre por la armonía entre su tipografía y sus grabados. Se considera uno de los libros más bellos del Renacimiento.',
            },
        ],
    },
]
