import { Html } from "@react-three/drei";
import type { CityId } from "../data/environment";
import { landmarks } from "../data/landmarks";

interface Props
{
    city: CityId;
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export default function LandmarkMarkers({ city, selectedId, onSelect }: Props)
{
    return (
        <group>
            {landmarks[city].map((place) =>
            (
                <Html key={place.id} position={place.point} center zIndexRange={[10, 0]}>
                    <button
                        type="button"
                        className={`env-landmark-pin ${selectedId === place.id ? "is-selected" : ""}`}
                        onClick={(event) =>
                        {
                            event.stopPropagation();
                            onSelect(place.id);
                        }}
                        aria-label={`Enfocar ${place.title}`}
                    >
                        <span className="env-landmark-number">{place.number}</span>
                        <span className="env-landmark-label">{place.title}</span>
                    </button>
                </Html>
            ))}
        </group>
    );
}
