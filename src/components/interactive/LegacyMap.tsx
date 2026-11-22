import { Minus, Plus, RotateCcw, ZoomIn } from 'lucide-react'
import { animate, motion, useMotionValue } from 'motion/react'
import { useRef, useState } from 'react'
import { EUROPE_FOCUS, MAP_IMAGE, PLACES, ROUTES, type LegacyPlace, type PlaceType } from '../../data/legacy'

interface LegacyMapProps
{
    activeId: string | null
    onSelect: (id: string) => void
}

const MAP_W = 2048
const MAP_H = 1394
const MIN_ZOOM = 1
const MAX_ZOOM = 3

const PIN_COLORS: Record<PlaceType, string> = {
    origen: 'bg-gold text-night border-cream',
    europa: 'bg-accent text-cream border-cream',
    america: 'bg-[#2c5b8f] text-cream border-cream',
}

const LABEL_COLORS: Record<PlaceType, string> = {
    origen: 'bg-night/90 text-gold border-gold',
    europa: 'bg-[#4a1018]/90 text-cream border-accent/60',
    america: 'bg-[#16304f]/90 text-cream border-[#5b8ac0]/60',
}

function routePath(from: LegacyPlace, to: LegacyPlace)
{
    const x1 = (from.x / 100) * MAP_W
    const y1 = (from.y / 100) * MAP_H
    const x2 = (to.x / 100) * MAP_W
    const y2 = (to.y / 100) * MAP_H
    const dx = x2 - x1
    const dy = y2 - y1
    const bend = Math.abs(dx) > 400 ? 0.25 : 0.15
    const cx = (x1 + x2) / 2 + dy * bend
    const cy = (y1 + y2) / 2 - Math.abs(dx) * bend
    return `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`
}

export function LegacyMap({ activeId, onSelect }: LegacyMapProps)
{
    const frameRef = useRef<HTMLDivElement>(null)
    const [zoom, setZoom] = useState(1)
    const [hoverId, setHoverId] = useState<string | null>(null)
    const panX = useMotionValue(0)
    const panY = useMotionValue(0)

    const focusOn = (x: number, y: number, scale: number) =>
    {
        const frame = frameRef.current
        if (!frame)
            return
        const { width, height } = frame.getBoundingClientRect()
        setZoom(scale)
        animate(panX, -(x / 100 - 0.5) * width * scale, { type: 'spring', stiffness: 200, damping: 30 })
        animate(panY, -(y / 100 - 0.5) * height * scale, { type: 'spring', stiffness: 200, damping: 30 })
    }

    const changeZoom = (delta: number) =>
    {
        const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom + delta))
        if (next === MIN_ZOOM)
        {
            resetView()
            return
        }
        const ratio = next / zoom
        setZoom(next)
        animate(panX, panX.get() * ratio, { type: 'spring', stiffness: 200, damping: 30 })
        animate(panY, panY.get() * ratio, { type: 'spring', stiffness: 200, damping: 30 })
    }

    const resetView = () =>
    {
        setZoom(1)
        animate(panX, 0, { type: 'spring', stiffness: 200, damping: 30 })
        animate(panY, 0, { type: 'spring', stiffness: 200, damping: 30 })
    }

    const handleSelect = (place: LegacyPlace) =>
    {
        onSelect(place.id)
        if (place.minor && zoom < 2)
            focusOn(EUROPE_FOCUS.x, EUROPE_FOCUS.y, EUROPE_FOCUS.zoom)
    }

    const byId = (id: string) => PLACES.find((place) => place.id === id)!

    return (
        <div
            ref={frameRef}
            className="relative overflow-hidden rounded-2xl border-2 border-gold/60 bg-[#1d2b3a] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)]"
            style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}
        >
            <motion.div
                drag={zoom > 1}
                dragElastic={0.05}
                dragMomentum={false}
                style={{ x: panX, y: panY }}
                animate={{ scale: zoom }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                className={`absolute inset-0 ${zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
            >
                <img
                    src={MAP_IMAGE}
                    alt="Typus Orbis Terrarum, mapa del mundo de Abraham Ortelius (1570)"
                    draggable={false}
                    className="absolute inset-0 size-full select-none"
                />

                {/* Rutas de difusión */}
                <svg
                    viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                    className="pointer-events-none absolute inset-0 size-full"
                    aria-hidden="true"
                >
                    <defs>
                        <marker id="legacy-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                            <path d="M0 0L10 5L0 10z" fill="#f3ebdd" />
                        </marker>
                    </defs>
                    {ROUTES.map(([fromId, toId], index) =>
                    {
                        const to = byId(toId)
                        const isActive = activeId === toId

                        return (
                            <motion.path
                                key={`${fromId}-${toId}`}
                                d={routePath(byId(fromId), to)}
                                fill="none"
                                stroke={isActive ? '#d4a24c' : '#f3ebdd'}
                                strokeWidth={(isActive ? 5 : 3.5) / zoom}
                                strokeDasharray={`${14 / zoom} ${10 / zoom}`}
                                strokeLinecap="round"
                                markerEnd="url(#legacy-arrow)"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 0.95 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.4, delay: 0.3 + index * 0.2, ease: 'easeInOut' }}
                                style={{ filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.7))' }}
                            />
                        )
                    })}
                </svg>

                {/* Marcadores */}
                {PLACES.map((place) =>
                {
                    const isActive = activeId === place.id
                    const showLabel = !place.minor || zoom >= 2 || isActive || hoverId === place.id

                    return (
                        <button
                            key={place.id}
                            type="button"
                            onClick={() => handleSelect(place)}
                            onPointerDown={(event) => event.stopPropagation()}
                            onMouseEnter={() => setHoverId(place.id)}
                            onMouseLeave={() => setHoverId(null)}
                            onFocus={() => setHoverId(place.id)}
                            onBlur={() => setHoverId(null)}
                            aria-label={`${place.name}: ver detalle`}
                            aria-pressed={isActive}
                            className={`group absolute ${isActive || hoverId === place.id ? 'z-30' : 'z-10'}`}
                            style={{ left: `${place.x}%`, top: `${place.y}%`, transform: `translate(-50%, -50%) scale(${1 / zoom})` }}
                        >
                            {isActive && (
                                <span className="absolute inset-0 animate-ping rounded-full bg-gold/60" />
                            )}
                            <span
                                className={`relative block size-4 rounded-full border-2 shadow-[0_2px_6px_rgba(0,0,0,0.7)] transition-transform group-hover:scale-125 ${PIN_COLORS[place.type]} ${
                                    isActive ? 'scale-125' : ''
                                }`}
                            />
                            {showLabel && (
                                <span
                                    className={`absolute top-1/2 -translate-y-1/2 rounded-md border px-2.5 py-0.5 font-display text-[clamp(0.75rem,1vw,1rem)] whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-colors ${
                                        place.labelSide === 'right' ? 'left-6' : 'right-6'
                                    } ${isActive ? 'border-gold bg-gold text-night' : LABEL_COLORS[place.type]}`}
                                >
                                    {place.name}
                                </span>
                            )}
                        </button>
                    )
                })}
            </motion.div>

            {/* Acceso rápido a Europa */}
            <button
                type="button"
                onClick={() => focusOn(EUROPE_FOCUS.x, EUROPE_FOCUS.y, EUROPE_FOCUS.zoom)}
                className="absolute top-2 right-2 z-20 flex items-center gap-2 rounded-lg border border-ink/20 bg-cream px-3 py-2 sm:top-4 sm:right-4 sm:px-4 text-base text-ink shadow-lg transition-colors hover:text-accent"
            >
                <ZoomIn size={18} />
                <span className="hidden sm:inline">Ver Europa</span>
            </button>

            {/* Controles de zoom */}
            <div className="absolute top-2 left-2 z-20 flex flex-col sm:top-4 sm:left-4 overflow-hidden rounded-lg border border-ink/20 bg-cream text-ink shadow-lg">
                <button
                    type="button"
                    aria-label="Acercar"
                    onClick={() => changeZoom(0.5)}
                    className="flex size-8 items-center justify-center sm:size-10 transition-colors hover:bg-ink/10"
                >
                    <Plus size={20} />
                </button>
                <button
                    type="button"
                    aria-label="Alejar"
                    onClick={() => changeZoom(-0.5)}
                    className="flex size-8 items-center justify-center sm:size-10 border-t border-ink/15 transition-colors hover:bg-ink/10"
                >
                    <Minus size={20} />
                </button>
                <button
                    type="button"
                    aria-label="Restablecer vista"
                    onClick={resetView}
                    className="flex size-8 items-center justify-center sm:size-10 border-t border-ink/15 transition-colors hover:bg-ink/10"
                >
                    <RotateCcw size={17} />
                </button>
            </div>
        </div>
    )
}
