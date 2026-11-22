import { useEffect, useRef, type ComponentRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { CityId } from "../data/environment";
import type { Landmark } from "../data/landmarks";

export interface CameraRequest
{
    landmark: Landmark | null;
    sequence: number;
}

interface Props
{
    city: CityId;
    request: CameraRequest;
    controls: RefObject<ComponentRef<typeof OrbitControls> | null>;
}

const home: Record<CityId, { position: THREE.Vector3; target: THREE.Vector3 }> =
{
    florence:
    {
        position: new THREE.Vector3(290, 205, 290),
        target: new THREE.Vector3(0, 3, -35)
    },
    rome:
    {
        position: new THREE.Vector3(330, 240, 325),
        target: new THREE.Vector3(0, 5, 0)
    }
};

export default function LandmarkCamera({ city, request, controls }: Props)
{
    const { camera } = useThree();
    const flying = useRef(false);
    const flyTime = useRef(0);
    const desiredPosition = useRef(home[city].position.clone());
    const desiredTarget = useRef(home[city].target.clone());

    useEffect(() =>
    {
        const orbit = controls.current;

        if (!orbit)
            return;

        function stopFlight()
        {
            flying.current = false;
        }

        orbit.addEventListener("start", stopFlight);

        return () => orbit.removeEventListener("start", stopFlight);
    }, [controls]);

    useEffect(() =>
    {
        const target = request.landmark
            ? new THREE.Vector3(...request.landmark.point)
            : home[city].target.clone();
        desiredTarget.current.copy(target);

        if (request.landmark)
        {
            const previousTarget = controls.current?.target ?? home[city].target;
            const direction = camera.position.clone().sub(previousTarget);

            if (direction.lengthSq() < 0.01)
                direction.set(1, 0.8, 1);

            direction.normalize();
            direction.y = Math.max(0.32, direction.y);
            direction.normalize();
            desiredPosition.current.copy(target).addScaledVector(direction, request.landmark.distance);
        }
        else
        {
            desiredPosition.current.copy(home[city].position);
        }

        flyTime.current = 0;
        flying.current = true;
    }, [camera, city, request, controls]);

    useFrame((_, delta) =>
    {
        if (!controls.current || !flying.current)
            return;

        flyTime.current += delta;
        const alpha = 1 - Math.exp(-4.5 * Math.min(delta, 0.08));
        camera.position.lerp(desiredPosition.current, alpha);
        controls.current.target.lerp(desiredTarget.current, alpha);
        controls.current.update();

        if (flyTime.current > 1.6 ||
            (camera.position.distanceTo(desiredPosition.current) < 0.5 &&
             controls.current.target.distanceTo(desiredTarget.current) < 0.5))
        {
            camera.position.copy(desiredPosition.current);
            controls.current.target.copy(desiredTarget.current);
            controls.current.update();
            flying.current = false;
        }
    });

    return null;
}
