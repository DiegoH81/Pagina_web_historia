import { lazy, Suspense, useCallback, useState } from "react";
import { FIGURES } from "../data/MuseumFigures";
import type { FigureId } from "../data/MuseumFigures";
import { useMuseumKeyboard } from "../controls/useMuseumKeyboard";
import "./MuseoRenacentista.css";

const MuseumScene = lazy(() => import("../scenes/MuseumScene"));

const FINAL_INDEX = FIGURES.length;

export default function MuseoRenacentista()
{
    const [stage, setStage] = useState(-1);
    const [expanded, setExpanded] = useState(false);
    const [collectionOpen, setCollectionOpen] = useState(false);

    const selected = stage >= 0 && stage < FINAL_INDEX ? FIGURES[stage] : null;
    const isFinal = stage === FINAL_INDEX;
    const inOverview = stage === -1;
    const room = selected?.room ?? (isFinal ? 3 : 0);

    const choose = useCallback((next: number) =>
    {
        setStage(Math.max(-1, Math.min(FINAL_INDEX, next)));
        setExpanded(false);
        setCollectionOpen(false);
    }, []);

    const selectById = useCallback((id: FigureId) =>
    {
        const index = FIGURES.findIndex((figure) => figure.id === id);
        if (index !== -1)
            choose(index);
    }, [choose]);

    useMuseumKeyboard(stage, choose);

    const progressLabel = inOverview ? "EL RECORRIDO" : isFinal ? "EXHIBICIÓN FINAL" : "PERSONAJES";

    return (
        <section id="personajes" className="rm-section" aria-label="Museo de personajes del Renacimiento">
            <div className="rm-stage">
                <Suspense fallback={<div className="rm-loading">Preparando la galería…</div>}>
                    <MuseumScene selected={selected} isFinal={isFinal} room={room} onSelect={selectById} />
                </Suspense>

                <header className="rm-topbar">
                    <div className="rm-heading">
                        <h2>Galería del <em>Renacimiento</em></h2>
                    </div>
                    <div className="rm-top-actions">
                        <button
                            type="button"
                            className="rm-text-button"
                            aria-expanded={collectionOpen}
                            aria-controls="rm-collection-menu"
                            onClick={() => setCollectionOpen((open) => !open)}
                        >
                            Elegir personaje <span aria-hidden="true">⌄</span>
                        </button>
                        {!inOverview && (
                            <button className="rm-text-button" type="button" onClick={() => choose(-1)}>
                                Vista general
                            </button>
                        )}
                    </div>
                </header>

                {collectionOpen && (
                    <div className="rm-collection-menu" id="rm-collection-menu" aria-label="Índice de personajes">
                        {FIGURES.map((figure, index) => (
                            <button key={figure.id} type="button" onClick={() => choose(index)}>
                                <span>{String(index + 1).padStart(2, "0")}</span>
                                {figure.name}
                            </button>
                        ))}
                        <button type="button" onClick={() => choose(FINAL_INDEX)}>
                            <span>09</span> La última cena
                        </button>
                    </div>
                )}

                {inOverview && (
                    <div className="rm-overview" aria-label="Introducción al museo">
                        <button type="button" className="rm-primary" onClick={() => choose(0)}>
                            Comenzar recorrido
                        </button>
                    </div>
                )}

                {selected && (
                    <aside
                        key={selected.id}
                        className={`rm-info ${selected.side === 1 ? "rm-info--left" : "rm-info--right"}`}
                        aria-label={`Información de ${selected.name}`}
                        aria-live="polite"
                    >
                        <span className="rm-info__eyebrow">{selected.discipline}</span>
                        <h3>{selected.name}</h3>
                        <span className="rm-info__dates">{selected.dates} <i /> {selected.city}</span>
                        <p className="rm-info__summary">{selected.description}</p>
                    </aside>
                )}

                {isFinal && (
                    <aside className="rm-info rm-info--right rm-info--final" aria-label="Obra final: La última cena">
                        <span className="rm-info__eyebrow">OBRA DE CIERRE · LEONARDO DA VINCI</span>
                        <h3>La última cena</h3>
                        <span className="rm-info__dates">1495–1498 · Santa Maria delle Grazie, Milán</span>
                        <p className="rm-info__summary">
                            Leonardo representa el momento en que Jesús anuncia que uno de sus discípulos
                            lo traicionará. Las reacciones de los apóstoles se agrupan alrededor de Cristo.
                        </p>
                        <button type="button" className="rm-info__expand" onClick={() => setExpanded((open) => !open)} aria-expanded={expanded} aria-controls="rm-details-final">
                            {expanded ? "Leer menos" : "¿Por qué esta obra?"}<span aria-hidden="true">{expanded ? "−" : "+"}</span>
                        </button>
                        <div id="rm-details-final" className={`rm-info__extra ${expanded ? "is-open" : ""}`} aria-hidden={!expanded}>
                            <div><p>Las líneas de la arquitectura convergen detrás de la cabeza de Cristo. Leonardo combina esa perspectiva con los gestos de los apóstoles para guiar la mirada por toda la composición.</p></div>
                        </div>
                    </aside>
                )}

                <footer className="rm-bottom">
                    <div className="rm-bottom__hint">{progressLabel}</div>
                    <nav className="rm-navigation" aria-label="Recorrido del museo">
                        <button type="button" onClick={() => choose(stage - 1)} disabled={inOverview} aria-label="Anterior">
                            Anterior
                        </button>
                        <span className="rm-navigation__counter">{inOverview ? "00" : String(stage + 1).padStart(2, "0")} <i /> 09</span>
                        <button type="button" onClick={() => choose(stage + 1)} disabled={isFinal} aria-label="Siguiente">
                            Siguiente
                        </button>
                    </nav>
                </footer>
            </div>
        </section>
    );
}
