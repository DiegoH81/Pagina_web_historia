import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { Html, useCursor, useGLTF, useTexture } from "@react-three/drei";
import { ACESFilmicToneMapping, CanvasTexture, DoubleSide, Mesh, MeshStandardMaterial, SRGBColorSpace } from "three";
import { FIGURES, FINAL_ARTWORK } from "../data/MuseumFigures";
import type { FigureId, MuseumFigure } from "../data/MuseumFigures";
import { GuidedCamera } from "../cameras/GuidedCamera";

type MuseumSceneProps =
{
    selected: MuseumFigure | null;
    isFinal: boolean;
    room: number;
    onSelect: (id: FigureId) => void;
};

const FINAL_MESH = "final_school_of_athens";
const IMAGE_PATHS = [...FIGURES.map((figure) => figure.image), FINAL_ARTWORK];

function frameArtwork(image: HTMLImageElement, picturePlane: Mesh)
{
    picturePlane.geometry.computeBoundingBox();
    const bounds = picturePlane.geometry.boundingBox;
    if (!bounds)
        return;

    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = Math.round(canvas.width * (bounds.max.y - bounds.min.y) / (bounds.max.x - bounds.min.x));
    const context = canvas.getContext("2d");
    if (!context)
        return;

    const scale = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    context.fillStyle = "#23170e";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);

    return new CanvasTexture(canvas);
}

function MuseumModel({ onSelect }: Pick<MuseumSceneProps, "onSelect">)
{
    const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/museum/MUSEO.glb`);
    const textures = useTexture(IMAGE_PATHS);
    const instance = useMemo(() => scene.clone(true), [scene]);
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    useEffect(() =>
    {
        const meshNames = [...FIGURES.map((figure) => `portrait_${figure.id}`), FINAL_MESH];
        const restoreMaterials: (() => void)[] = [];

        meshNames.forEach((name, index) =>
        {
            const picturePlane = instance.getObjectByName(name);
            if (!(picturePlane instanceof Mesh))
                return;

            const original = picturePlane.material;
            const surface = Array.isArray(original) ? original[0] : original;
            if (!(surface instanceof MeshStandardMaterial))
                return;

            const texture = textures[index];
            const source = texture.image;
            const image = name === FINAL_MESH && source instanceof HTMLImageElement
                ? frameArtwork(source, picturePlane) ?? texture
                : texture;
            image.flipY = false;
            image.colorSpace = SRGBColorSpace;
            image.needsUpdate = true;

            const material = surface.clone();
            material.map = image;
            material.color.set("#ffffff");
            // The works remain readable even in the museum's deliberately dim rooms.
            material.emissiveMap = image;
            material.emissive.set("#ffffff");
            material.emissiveIntensity = 0.62;
            material.roughness = 0.92;
            material.metalness = 0;
            material.side = DoubleSide;
            material.needsUpdate = true;
            picturePlane.material = material;
            restoreMaterials.push(() =>
            {
                picturePlane.material = original;
                material.dispose();
                if (image !== texture)
                    image.dispose();
            });
        });

        return () => restoreMaterials.forEach((restore) => restore());
    }, [instance, textures]);

    function handleClick(event: ThreeEvent<MouseEvent>)
    {
        if (!event.object.name.startsWith("portrait_"))
            return;
        const id = event.object.name.replace("portrait_", "") as FigureId;
        if (FIGURES.some((figure) => figure.id === id))
        {
            event.stopPropagation();
            onSelect(id);
        }
    }

    return (
        <primitive
            object={instance}
            onClick={handleClick}
            onPointerOver={(event: ThreeEvent<PointerEvent>) =>
            {
                if (event.object.name.startsWith("portrait_"))
                    setHovered(true);
            }}
            onPointerOut={() => setHovered(false)}
        />
    );
}

function Lights()
{
    return (
        <>
            <ambientLight intensity={1.18} color="#fff0dc" />
            <hemisphereLight intensity={0.55} color="#eecba5" groundColor="#23170e" />
            {([3.4, -5.6, -14.6, -23.6] as const).map((z) => (
                <group key={z}>
                    <pointLight position={[-4.8, 7.1, z]} color="#ffd8a8" intensity={65} distance={12} decay={2} />
                    <pointLight position={[4.8, 7.1, z]} color="#ffd8a8" intensity={65} distance={12} decay={2} />
                    <pointLight position={[0, 7.8, z + 0.8]} color="#f6dfbe" intensity={25} distance={13} decay={2} />
                </group>
            ))}
            <pointLight position={[0, 7.1, -29]} color="#ffe1b3" intensity={80} distance={14} decay={2} />
        </>
    );
}

export default function MuseumScene({ selected, isFinal, room, onSelect }: MuseumSceneProps)
{
    return (
        <Canvas
            className="rm-canvas"
            camera={{ position: [0, 4.60, 13.25], fov: 55, near: 0.1, far: 110 }}
            dpr={[1, 1.8]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            onCreated={({ gl }) =>
            {
                gl.toneMapping = ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.5;
            }}
        >
            <color attach="background" args={["#191410"]} />
            <fog attach="fog" args={["#191410", 33, 80]} />
            <Lights />
            <Suspense fallback={<Html center><span className="rm-scene-loading" role="status">Cargando la galería…</span></Html>}>
                <MuseumModel onSelect={onSelect} />
            </Suspense>
            <GuidedCamera selected={selected} isFinal={isFinal} room={room} />
        </Canvas>
    );
}
