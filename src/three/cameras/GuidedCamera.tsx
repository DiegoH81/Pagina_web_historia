import { useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Matrix4, Quaternion, Vector3 } from "three";
import type { MuseumFigure } from "../data/MuseumFigures";

interface GuidedCameraProps
{
    selected: MuseumFigure | null;
    isFinal: boolean;
    room: number;
}

const TRANSITION_DURATION = 1.35;

export function GuidedCamera({ selected, isFinal, room }: GuidedCameraProps)
{
    const { camera, size } = useThree();
    const compact = size.width <= 860;
    const narrow = size.width / size.height < 1;
    const position = useRef(new Vector3());
    const lookAt = useRef(new Vector3());
    const orientation = useRef(new Quaternion());
    const startPosition = useRef(new Vector3());
    const startOrientation = useRef(new Quaternion());
    const elapsed = useRef(0);

    useLayoutEffect(() =>
    {
        if (isFinal)
        {
            position.current.set(0, 4.65, narrow ? -22.5 : -26.5);
            lookAt.current.set(compact ? 0 : 1.1, compact ? 3.35 : 4.85, -32.26);
        }
        else if (selected)
        {
            // Keep the painting on the opposite side to the information card.
            position.current.set(selected.side * (narrow ? -1.1 : 0.65), 4.62, selected.z + 1.60);
            lookAt.current.set(selected.side * 4.85, compact ? 3.55 : 4.63, selected.z);
        }
        else
        {
            position.current.set(0, 4.60, 13.25 - room * 9);
            lookAt.current.set(0, 4.55, -9 - room * 9);
        }

        const matrix = new Matrix4().lookAt(position.current, lookAt.current, camera.up);
        orientation.current.setFromRotationMatrix(matrix);
        startPosition.current.copy(camera.position);
        startOrientation.current.copy(camera.quaternion);
        elapsed.current = 0;
    }, [camera, compact, isFinal, narrow, room, selected]);

    useFrame((_, delta) =>
    {
        if (elapsed.current >= TRANSITION_DURATION)
            return;

        elapsed.current = Math.min(elapsed.current + delta, TRANSITION_DURATION);
        const progress = elapsed.current / TRANSITION_DURATION;
        const ease = progress * progress * (3 - 2 * progress);
        camera.position.lerpVectors(startPosition.current, position.current, ease);
        camera.quaternion.slerpQuaternions(startOrientation.current, orientation.current, ease);
        camera.updateMatrixWorld();
    });

    return null;
}
