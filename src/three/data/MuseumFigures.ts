export type FigureId =
    | "leonardo"
    | "michelangelo"
    | "brunelleschi"
    | "gutenberg"
    | "copernico"
    | "erasmo"
    | "maquiavelo"
    | "isabella";

export interface MuseumFigure
{
    id: FigureId;
    name: string;
    discipline: string;
    dates: string;
    description: string;
    city: string;
    side: -1 | 1;
    z: number;
    room: number;
    image: string;
}

export const FIGURES: MuseumFigure[] =
[
    {
        id: "leonardo",
        name: "Leonardo da Vinci",
        discipline: "Arte e investigación",
        dates: "1452–1519",
        city: "Florencia · Milán",
        description: "Pintor e investigador que unió la observación de la naturaleza con el estudio de la anatomía, la mecánica y la representación artística.",
        side: -1, z: 3.4, room: 0,
        image: `${import.meta.env.BASE_URL}images/characters/leonardo.webp`
    },
    {
        id: "copernico",
        name: "Nicolás Copérnico",
        discipline: "Astronomía",
        dates: "1473–1543",
        city: "Polonia · Italia",
        description: "Propuso un modelo heliocéntrico que situaba al Sol cerca del centro del sistema planetario, transformando los debates sobre el cosmos.",
        side: 1, z: 3.4, room: 0,
        image: `${import.meta.env.BASE_URL}images/characters/copernico.webp`
    },
    {
        id: "michelangelo",
        name: "Miguel Ángel Buonarroti",
        discipline: "Escultura y pintura",
        dates: "1475–1564",
        city: "Florencia · Roma",
        description: "Escultor, pintor y arquitecto cuyas obras exploraron el cuerpo humano y la expresividad monumental del Alto Renacimiento.",
        side: -1, z: -5.6, room: 1,
        image: `${import.meta.env.BASE_URL}images/characters/miguel_angel.webp`
    },
    {
        id: "erasmo",
        name: "Erasmo de Róterdam",
        discipline: "Humanismo",
        dates: "c. 1466–1536",
        city: "Países Bajos · Europa",
        description: "Humanista que defendió el estudio crítico de los textos, la educación y la renovación intelectual de la sociedad cristiana.",
        side: 1, z: -5.6, room: 1,
        image: `${import.meta.env.BASE_URL}images/characters/erasmo.webp`
    },
    {
        id: "brunelleschi",
        name: "Filippo Brunelleschi",
        discipline: "Arquitectura",
        dates: "1377–1446",
        city: "Florencia",
        description: "Arquitecto e ingeniero que desarrolló soluciones innovadoras para la cúpula de la catedral florentina y contribuyó al estudio de la perspectiva.",
        side: -1, z: -14.6, room: 2,
        image: `${import.meta.env.BASE_URL}images/characters/brunelleschi.webp`
    },
    {
        id: "maquiavelo",
        name: "Nicolás Maquiavelo",
        discipline: "Pensamiento político",
        dates: "1469–1527",
        city: "Florencia",
        description: "Diplomático y escritor que analizó el ejercicio del poder y las decisiones políticas a partir de experiencias históricas y de su tiempo.",
        side: 1, z: -14.6, room: 2,
        image: `${import.meta.env.BASE_URL}images/characters/maquiavelo.webp`
    },
    {
        id: "gutenberg",
        name: "Johannes Gutenberg",
        discipline: "Imprenta",
        dates: "c. 1400–1468",
        city: "Maguncia",
        description: "Desarrolló y difundió en Europa un sistema de impresión con tipos móviles metálicos que favoreció la circulación de libros y conocimientos.",
        side: -1, z: -23.6, room: 3,
        image: `${import.meta.env.BASE_URL}images/characters/gutenberg.webp`
    },
    {
        id: "isabella",
        name: "Isabel de Este",
        discipline: "Mecenazgo y cultura",
        dates: "1474–1539",
        city: "Mantua",
        description: "Marquesa de Mantua, coleccionista y promotora de artistas y humanistas. Su corte fue un centro importante de la cultura renacentista.",
        side: 1, z: -23.6, room: 3,
        image: `${import.meta.env.BASE_URL}images/characters/isabel_de_este.webp`
    }
];

export const FINAL_ARTWORK = `${import.meta.env.BASE_URL}images/characters/ultima_cena.webp`;
