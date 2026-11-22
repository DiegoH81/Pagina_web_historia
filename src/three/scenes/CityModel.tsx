import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { CityId } from "../data/environment";

interface Props
{
    city: CityId;
    url: string;
    glow: number;
}

const landmarkPrefixes: Record<CityId, string[]> =
{
    florence:
    [
        "florence_cathedral_detailed_",
        "palazzo_vecchio_enhanced_v3_",
        "palazzo_medici_detailed_"
    ],
    rome:
    [
        "Monumento_san_pietro_1512_",
        "Monumento_palacios_vaticanos_",
        "Monumento_castel_sant_angelo_"
    ]
};

function isWindow(name: string, city: CityId): boolean
{
    const lower = name.toLowerCase();

    if (city === "rome")
        return lower.includes("ventanas_ciudad") || (lower.includes("monumento_") && (lower.includes("_window") || lower.includes("_glass")));

    return lower.includes("florence_window") && !lower.includes("_trim") && !lower.includes("_shutter")
        || lower.includes("ventanasoscuras")
        || lower.includes("_glass") && (lower.includes("medici") || lower.includes("vecchio") || lower.includes("cathedral"));
}

function getLandmarkCenters(root: THREE.Object3D, city: CityId): THREE.Vector3[]
{
    const centers: THREE.Vector3[] = [];

    for (const prefix of landmarkPrefixes[city])
    {
        const box = new THREE.Box3();
        let found = false;

        root.traverse((node) =>
        {
            if (!node.name.startsWith(prefix))
                return;

            box.expandByObject(node);
            found = true;
        });

        if (!found || box.isEmpty())
            continue;

        const center = box.getCenter(new THREE.Vector3());
        center.y = box.min.y + 5;
        centers.push(center);
    }

    return centers;
}

export default function CityModel({ city, url, glow }: Props)
{
    const gltf = useGLTF(url);

    const { model, illuminatedMaterials, lampPositions } = useMemo(() =>
    {
        const model = gltf.scene.clone(true);
        const illuminatedMaterials: THREE.MeshStandardMaterial[] = [];

        model.traverse((node) =>
        {
            if (!(node instanceof THREE.Mesh))
                return;

            const lower = node.name.toLowerCase();
            const decorative = lower.includes("window") || lower.includes("ventana")
                || lower.includes("glass") || lower.includes("water") || lower.includes("agua")
                || lower.includes("arno") || lower.includes("_trim")
                || lower.includes("_hilada") || lower.includes("tejado_cumbrera");
            node.castShadow = !decorative;
            node.receiveShadow = true;

            if (!isWindow(node.name, city))
                return;

            const originals = Array.isArray(node.material) ? node.material : [node.material];
            const replacements = originals.map((material) =>
            {
                if (!(material instanceof THREE.MeshStandardMaterial))
                    return material;

                const replacement = material.clone();
                replacement.emissive.set("#ffbe69");
                replacement.emissiveIntensity = 0;
                illuminatedMaterials.push(replacement);
                return replacement;
            });

            node.material = Array.isArray(node.material) ? replacements : replacements[0];
        });

        model.updateMatrixWorld(true);
        const lampPositions = getLandmarkCenters(model, city);

        return { model, illuminatedMaterials, lampPositions };
    }, [gltf.scene, city]);

    useEffect(() =>
    {
        for (const material of illuminatedMaterials)
            material.emissiveIntensity = 1.9 * glow;
    }, [illuminatedMaterials, glow]);

    useEffect(() =>
    {
        return () =>
        {
            for (const material of illuminatedMaterials)
                material.dispose();
        };
    }, [illuminatedMaterials]);

    return (
        <group>
            <primitive object={model} />
            {lampPositions.map((position, index) =>
            (
                <pointLight
                    key={`${city}-${index}`}
                    position={[position.x, position.y + 8, position.z]}
                    color="#ffb66b"
                    intensity={glow * 19}
                    distance={42}
                    decay={2}
                />
            ))}
        </group>
    );
}
