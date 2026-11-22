import { useEffect, useMemo } from "react";
import * as THREE from "three";

interface Props
{
    sunPosition: [number, number, number];
    opacity: number;
}

function makeGlowTexture(): THREE.CanvasTexture
{
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;

    const context = canvas.getContext("2d");

    if (!context)
        throw new Error("No se pudo inicializar el resplandor del sol.");

    const glow = context.createRadialGradient(128, 128, 8, 128, 128, 126);
    glow.addColorStop(0, "rgba(255, 242, 210, 0.75)");
    glow.addColorStop(0.18, "rgba(255, 215, 150, 0.46)");
    glow.addColorStop(0.48, "rgba(255, 185, 105, 0.14)");
    glow.addColorStop(1, "rgba(255, 185, 105, 0)");

    context.fillStyle = glow;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

export default function WorldSun({ sunPosition, opacity }: Props)
{
    const glowTexture = useMemo(makeGlowTexture, []);

    useEffect(() =>
    {
        return () => glowTexture.dispose();
    }, [glowTexture]);

    const position: [number, number, number] =
    [
        sunPosition[0] * 3.6,
        sunPosition[1] * 3.6,
        sunPosition[2] * 3.6
    ];

    if (opacity <= 0.01)
        return null;

    return (
        <group position={position}>
            <sprite scale={[150, 150, 1]}>
                <spriteMaterial
                    map={glowTexture}
                    color="#ffcf8f"
                    transparent
                    opacity={opacity}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                    depthTest
                    fog={false}
                    toneMapped={false}
                />
            </sprite>
            <mesh>
                <sphereGeometry args={[16, 24, 16]} />
                <meshBasicMaterial
                    color="#ffe6bd"
                    transparent
                    opacity={opacity}
                    fog={false}
                    toneMapped={false}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}
