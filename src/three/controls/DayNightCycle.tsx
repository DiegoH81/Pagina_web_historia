import * as THREE from "three";
import WorldSun from "./WorldSun";

interface Props
{
    sky: SkyState;
}

interface Keyframe
{
    hour: number;
    skyTop: string;
    skyBottom: string;
    sunlight: string;
    ambient: number;
    direct: number;
}

const keyframes: Keyframe[] =
[
    { hour: 0,  skyTop: "#0d172b", skyBottom: "#27334d", sunlight: "#839cc7", ambient: 0.36, direct: 0.0 },
    { hour: 4,  skyTop: "#1b2845", skyBottom: "#4b405c", sunlight: "#a8b5d2", ambient: 0.40, direct: 0.0 },
    { hour: 6,  skyTop: "#495b84", skyBottom: "#c68e83", sunlight: "#ebac87", ambient: 0.52, direct: 0.40 },
    { hour: 8,  skyTop: "#83b1d1", skyBottom: "#ead0ae", sunlight: "#ffd4a3", ambient: 0.78, direct: 1.80 },
    { hour: 12, skyTop: "#84b9de", skyBottom: "#d8d5b6", sunlight: "#fff0cc", ambient: 0.92, direct: 2.60 },
    { hour: 16, skyTop: "#8baeca", skyBottom: "#e9c6ac", sunlight: "#ffe0ae", ambient: 0.86, direct: 2.20 },
    { hour: 18, skyTop: "#755a85", skyBottom: "#d99578", sunlight: "#fbb280", ambient: 0.60, direct: 0.95 },
    { hour: 20, skyTop: "#26314e", skyBottom: "#57506d", sunlight: "#b6aec9", ambient: 0.40, direct: 0.0 },
    { hour: 22, skyTop: "#141f38", skyBottom: "#333c56", sunlight: "#91a9cf", ambient: 0.37, direct: 0.0 },
    { hour: 24, skyTop: "#0d172b", skyBottom: "#27334d", sunlight: "#839cc7", ambient: 0.36, direct: 0.0 }
];

function mixColor(from: string, to: string, fraction: number): string
{
    const color = new THREE.Color(from);
    color.lerp(new THREE.Color(to), fraction);
    return `#${color.getHexString()}`;
}

export interface SkyState
{
    top: string;
    bottom: string;
    fog: string;
    sunlight: string;
    ambient: number;
    direct: number;
    dayFactor: number;
    windowGlow: number;
    sunOpacity: number;
    sunPosition: [number, number, number];
}

export function getSkyState(hour: number): SkyState
{
    const time = ((hour % 24) + 24) % 24;
    let start = keyframes[0];
    let end = keyframes[keyframes.length - 1];

    for (let index = 0; index < keyframes.length - 1; index++)
    {
        if (time < keyframes[index + 1].hour)
        {
            start = keyframes[index];
            end = keyframes[index + 1];
            break;
        }
    }

    const span = end.hour - start.hour;
    const raw = span > 0 ? (time - start.hour) / span : 0;
    const t = raw * raw * (3 - 2 * raw); // continuidad suave en cada tramo
    const angle = ((time - 6) / 12) * Math.PI;
    const elevation = Math.sin(angle);
    const dayFactor = THREE.MathUtils.smoothstep(elevation, -0.28, 0.22);
    const nightFactor = 1 - dayFactor;
    const skyBottom = mixColor(start.skyBottom, end.skyBottom, t);

    return {
        top: mixColor(start.skyTop, end.skyTop, t),
        bottom: skyBottom,
        fog: mixColor(start.skyTop, skyBottom, 0.64),
        sunlight: mixColor(start.sunlight, end.sunlight, t),
        ambient: THREE.MathUtils.lerp(start.ambient, end.ambient, t),
        direct: THREE.MathUtils.lerp(start.direct, end.direct, t) * dayFactor,
        dayFactor,
        windowGlow: THREE.MathUtils.smoothstep(nightFactor, 0.35, 0.88),
        sunOpacity: THREE.MathUtils.smoothstep(elevation, -0.05, 0.18),
        sunPosition: [-Math.cos(angle) * 220, Math.max(0.12, elevation) * 220, -90]
    };
}

export function DayNightCycle({ sky }: Props)
{
    const night = 1 - sky.dayFactor;
    const ambientColor = mixColor("#a2b9e1", "#fff0df", sky.dayFactor);

    return (
        <>
            <ambientLight color={ambientColor} intensity={sky.ambient} />
            <hemisphereLight args={["#e8ecf3", "#504234", 0.30 + 0.29 * sky.dayFactor]} />
            <directionalLight
                color="#bdcee6"
                position={[95, 175, -105]}
                intensity={0.32 * night + 0.12 * sky.dayFactor}
                castShadow={false}
            />
            <directionalLight
                color={sky.sunlight}
                position={sky.sunPosition}
                intensity={sky.direct}
                castShadow
                shadow-bias={-0.0001}
                shadow-normalBias={0.025}
                shadow-mapSize={[2048, 2048]}
                shadow-camera-left={-210}
                shadow-camera-right={210}
                shadow-camera-top={210}
                shadow-camera-bottom={-210}
                shadow-camera-near={1}
                shadow-camera-far={650}
            />
            <WorldSun sunPosition={sky.sunPosition} opacity={sky.sunOpacity} />
            <fog attach="fog" args={[sky.fog, 390, 950]} />
        </>
    );
}
