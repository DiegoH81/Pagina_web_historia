import type { CityId } from "./environment";

export interface Landmark
{
    id: string;
    number: string;
    title: string;
    period: string;
    category: string;
    short: string;
    body: string;
    point: [number, number, number];
    distance: number;
}

export const landmarks: Record<CityId, Landmark[]> =
{
    florence:
    [
        {
            id: "duomo", number: "01", title: "Santa María del Fiore", period: "1420–1436",
            category: "Arquitectura", short: "La cúpula de Brunelleschi",
            body: "La monumental cúpula de Brunelleschi fue una innovación técnica y uno de los símbolos del Renacimiento florentino.",
            point: [25, 37, -52], distance: 78
        },
        {
            id: "medici", number: "02", title: "Palacio Médici", period: "Desde 1444",
            category: "Mecenazgo", short: "La familia que impulsó las artes",
            body: "La residencia de los Médici permite descubrir el papel de las familias de comerciantes y banqueros en el patrocinio cultural.",
            point: [-68, 19, -49], distance: 72
        },
        {
            id: "vecchio", number: "03", title: "Palazzo Vecchio", period: "Desde 1299",
            category: "Política", short: "El poder cívico de Florencia",
            body: "Sede del gobierno urbano: aquí se puede explicar la vida política de la república y su relación con las élites florentinas.",
            point: [63, 46, -11], distance: 77
        },
        {
            id: "ponte", number: "04", title: "Ponte Vecchio", period: "Reconstruido en 1345",
            category: "Comercio", short: "Tiendas sobre el Arno",
            body: "Un puente comercial con locales a los lados y un paso central abierto; una imagen característica de la vida urbana florentina.",
            point: [43, 11, 41], distance: 77
        },
        {
            id: "arno", number: "05", title: "Río Arno", period: "Florencia, siglo XV",
            category: "Vida urbana", short: "El río que atraviesa la ciudad",
            body: "El Arno conectaba espacios de comercio y trabajo y ayudaba a organizar los barrios y las comunicaciones de Florencia.",
            point: [20, 3, 65], distance: 100
        }
    ],
    rome:
    [
        {
            id: "vaticano", number: "01", title: "Vaticano y Capilla Sixtina", period: "Comienzos del siglo XVI",
            category: "Mecenazgo pontificio", short: "El papado como gran mecenas",
            body: "Los Palacios Vaticanos y la Capilla Sixtina acogieron encargos artísticos de Rafael y Miguel Ángel que marcaron el Alto Renacimiento.",
            point: [-105, 35, 19], distance: 91
        },
        {
            id: "castel", number: "02", title: "Castel Sant’Angelo", period: "Antigüedad y Renacimiento",
            category: "Ciudad y defensa", short: "Fortaleza junto al Tíber",
            body: "Un antiguo mausoleo convertido en fortaleza y conectado con la otra orilla por el puente de Sant’Angelo.",
            point: [-40, 34, -51], distance: 79
        },
        {
            id: "panteon", number: "03", title: "Panteón", period: "Monumento romano antiguo",
            category: "Legado clásico", short: "El modelo de la arquitectura antigua",
            body: "La arquitectura monumental de la antigua Roma siguió siendo una referencia para los artistas y arquitectos renacentistas.",
            point: [51, 25, -31], distance: 86
        },
        {
            id: "coliseo", number: "04", title: "Coliseo", period: "Monumento romano antiguo",
            category: "Antigüedad clásica", short: "El pasado presente en Roma",
            body: "Los restos de la Roma imperial formaban parte del paisaje estudiado y reinterpretado por humanistas y artistas.",
            point: [105, 22, -43], distance: 100
        },
        {
            id: "tempietto", number: "05", title: "Tempietto de Bramante", period: "c. 1502",
            category: "Arquitectura", short: "Equilibrio y formas clásicas",
            body: "El pequeño templo circular de Bramante muestra la reinterpretación de las proporciones y órdenes de la Antigüedad.",
            point: [-92, 27, 82], distance: 79
        },
        {
            id: "tiber", number: "06", title: "Río Tíber", period: "Roma, siglo XVI",
            category: "Geografía urbana", short: "El río que estructura la ciudad",
            body: "El Tíber atraviesa Roma con numerosos meandros y conecta barrios, puentes y zonas del Vaticano con el centro urbano.",
            point: [15, 6, 35], distance: 104
        },
        {
            id: "puente", number: "07", title: "Ponte Sant’Angelo", period: "Puente de origen romano",
            category: "Conexiones urbanas", short: "El camino hacia el Vaticano",
            body: "Este puente cruzaba el Tíber junto al castillo y era una de las vías de acceso al Vaticano.",
            point: [-9, 8, -43], distance: 80
        }
    ]
};
