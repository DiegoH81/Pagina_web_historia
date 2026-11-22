import { Suspense, useEffect, useMemo, useRef, useState, type ComponentRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { cities, type CityId } from "../data/environment";
import { landmarks } from "../data/landmarks";
import { DayNightCycle, getSkyState } from "../controls/DayNightCycle";
import LandmarkCamera, { type CameraRequest } from "../cameras/LandmarkCamera";
import LandmarkMarkers from "../ui/LandmarkMarkers";
import CityModel from "../scenes/CityModel";

import "./environment.css";

function LoadingIndicator()
{
    const { active, progress } = useProgress();

    if (!active)
        return null;

    return <div className="env-loading" role="status">Preparando maqueta… {Math.round(progress)} %</div>;
}

export default function EnvironmentViewer()
{
    const [city, setCity] = useState<CityId>("florence");
    const [hour, setHour] = useState(17.1);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [showPlaces, setShowPlaces] = useState(false);
    const [cameraRequest, setCameraRequest] = useState<CameraRequest>({ landmark: null, sequence: 0 });
    const controls = useRef<ComponentRef<typeof OrbitControls> | null>(null);
    const sky = useMemo(() => getSkyState(hour), [hour]);
    const selectedCity = cities[city];
    const cityLandmarks = landmarks[city];
    const selected = cityLandmarks.find((place) => place.id === selectedId) ?? null;

    useEffect(() =>
    {
        let frame = 0;
        let previous = 0;
        let accumulator = 0;

        function tick(timestamp: number)
        {
            if (previous === 0)
                previous = timestamp;

            const delta = Math.min((timestamp - previous) / 1000, 0.08);
            previous = timestamp;

            if (document.visibilityState === "visible")
                accumulator += delta;

            if (accumulator >= 1 / 30)
            {
                const elapsed = accumulator;
                accumulator = 0;
                setHour((value) => (value + elapsed * 24 / 200) % 24);
            }

            frame = window.requestAnimationFrame(tick);
        }

        frame = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(frame);
    }, []);

    function changeCity(next: CityId)
    {
        if (next === city)
            return;

        setSelectedId(null);
        setShowPlaces(false);
        setCity(next);
        setCameraRequest((request) => ({ landmark: null, sequence: request.sequence + 1 }));
    }

    function selectLandmark(id: string)
    {
        const place = cityLandmarks.find((landmark) => landmark.id === id);

        if (!place)
            return;

        setSelectedId(id);
        setShowPlaces(false);
        setCameraRequest((request) => ({ landmark: place, sequence: request.sequence + 1 }));
    }

    function showOverview()
    {
        setSelectedId(null);
        setCameraRequest((request) => ({ landmark: null, sequence: request.sequence + 1 }));
    }

    function closeInfo()
    {
        setSelectedId(null);
    }

    return (
        <div className="env-root before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-[3] before:h-[clamp(1rem,2vw,2rem)] before:bg-linear-to-b/srgb before:from-cream before:to-transparent before:via-cream/40 before:via-[35%] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-[3] after:h-[clamp(1.5rem,3vw,3.25rem)] after:bg-linear-to-t/srgb after:from-night after:to-transparent after:via-night/50 after:via-[40%]" style={{ backgroundColor: sky.top }}>
            <div className="env-sky" style={{ background: `linear-gradient(180deg, ${sky.top} 0%, ${sky.bottom} 100%)` }}>
                <div className="env-sky-glow" style={{ opacity: 0.08 + sky.dayFactor * 0.42 }} />
            </div>

            <header className="env-header">
                <div className="env-heading">
                    <span className="env-kicker">EL ENTORNO DEL RENACIMIENTO</span>
                    <h2>{selectedCity.label} <em>{selectedCity.period}</em></h2>
                    <p>{selectedCity.subtitle}</p>
                </div>
                <div className="env-city-choice" role="group" aria-label="Selecciona una ciudad">
                    <button type="button" aria-pressed={city === "florence"} className={city === "florence" ? "active" : ""} onClick={() => changeCity("florence")}>Florencia</button>
                    <button type="button" aria-pressed={city === "rome"} className={city === "rome" ? "active" : ""} onClick={() => changeCity("rome")}>Roma</button>
                </div>
            </header>

            <div className="env-canvas" aria-label={`Maqueta tridimensional de ${selectedCity.label}`}>
                <Canvas
                    camera={{ position: [290, 205, 290], fov: 39, near: 0.1, far: 4000 }}
                    shadows="percentage"
                    dpr={[1, 1.7]}
                    gl={{ alpha: true, antialias: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.22 }}
                >
                    <DayNightCycle sky={sky} />
                    <OrbitControls
                        ref={controls}
                        makeDefault
                        enablePan={false}
                        enableDamping
                        dampingFactor={0.08}
                        minDistance={30}
                        maxDistance={800}
                        minPolarAngle={0.18}
                        maxPolarAngle={Math.PI / 2.07}
                    />
                    <LandmarkCamera city={city} request={cameraRequest} controls={controls} />
                    <Suspense fallback={null}>
                        <CityModel key={city} city={city} url={selectedCity.model} glow={sky.windowGlow} />
                        <LandmarkMarkers city={city} selectedId={selectedId} onSelect={selectLandmark} />
                    </Suspense>
                </Canvas>
            </div>

            <div className="env-vignette" aria-hidden="true" />
            <LoadingIndicator />

            {selected ?
            (
                <aside key={`${city}-${selected.id}`} className={`env-place-card ${selected.point[0] > 0 ? "env-place-card--left" : ""}`} aria-label="Información del punto de interés">
                    <button type="button" className="env-place-close" onClick={closeInfo} aria-label="Cerrar ficha">×</button>
                    <span className="env-place-eyebrow">{selected.number} / {selected.category.toUpperCase()}</span>
                    <h3>{selected.title}</h3>
                    <span className="env-place-period">{selected.period}</span>
                    <p className="env-place-lead">{selected.short}</p>
                    <p className="env-place-body">{selected.body}</p>
                    <button type="button" className="env-back-button" onClick={showOverview}>Vista general de la ciudad</button>
                </aside>
            ) :
            (
                <div className="env-explore-control">
                    <button type="button" className="env-explore-toggle" onClick={() => setShowPlaces((value) => !value)} aria-expanded={showPlaces}>
                        <span className="env-explore-icon">⌖</span>
                        <span>Explorar monumentos</span>
                        <span className="env-explore-count">{String(cityLandmarks.length).padStart(2, "0")}</span>
                    </button>
                    {showPlaces &&
                    (
                        <div className="env-place-menu">
                            {cityLandmarks.map((place) =>
                            (
                                <button type="button" key={place.id} onClick={() => selectLandmark(place.id)}>
                                    <small>{place.number}</small>
                                    <span>{place.title}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
