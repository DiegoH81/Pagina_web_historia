import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

function RotatingCube()
{
    const mesh = useRef<Mesh>(null);

    useFrame((_, delta) => {
        if (mesh.current)
        mesh.current.rotation.y += delta * 0.5;
    });

    return (
        <mesh ref={mesh}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#b08d57" metalness={0.3} roughness={0.4} />
        </mesh>
    );
}

export default function TestScene()
{
    return (
        <div className="h-[500px] w-full bg-[#1c141b]">
        <Canvas camera={{ position: [4, 3, 5], fov: 45 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={2} />

            <RotatingCube />
            <OrbitControls />
        </Canvas>
        </div>
    );
}