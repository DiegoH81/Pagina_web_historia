import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { BeforeAfterCompare } from '../components/interactive/BeforeAfterCompare'
import { CONSEQUENCES } from '../data/consequences'

export function Consequences()
{
    const [activeId, setActiveId] = useState(CONSEQUENCES[0].id)
    const active = CONSEQUENCES.find((item) => item.id === activeId) ?? CONSEQUENCES[0]
    const ActiveIcon = active.icon

    return (
        <section id="consecuencias" className="relative overflow-hidden bg-night py-24 text-cream">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(212,162,76,0.12),transparent_55%)]" />

            <div className="relative mx-auto max-w-[1600px] px-6 lg:px-14">
                <div>
                    <p className="text-sm font-medium tracking-[0.3em] text-cream/80 uppercase">VII · Consecuencias</p>
                    <h2 className="mt-3 font-display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.05]">
                        Un mundo en <span className="text-gold">transformación</span>
                    </h2>
                    <p className="mt-3 text-[clamp(1.1rem,1.3vw,1.3rem)] text-cream-muted">
                        Cambios profundos en el arte, el conocimiento, la ciencia y el pensamiento político.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4" role="tablist" aria-label="Áreas de cambio">
                    {CONSEQUENCES.map((item) =>
                    {
                        const Icon = item.icon
                        const isActive = item.id === activeId

                        return (
                            <button
                                key={item.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => setActiveId(item.id)}
                                className={`relative flex items-center justify-center gap-2 rounded-xl border px-3 py-4 font-display text-[clamp(1rem,1.4vw,1.4rem)] transition-colors sm:gap-3 sm:px-5 ${
                                    isActive
                                        ? 'border-accent bg-accent text-cream'
                                        : 'border-line bg-night-soft text-cream hover:border-accent/60'
                                }`}
                            >
                                <Icon size={24} strokeWidth={1.5} className="shrink-0" />
                                <span>{item.tab}</span>
                            </button>
                        )
                    })}
                </div>

                <div className="mt-8">
                    <BeforeAfterCompare id={active.id} before={active.before} after={active.after} />
                    <p className="mt-3 hidden text-center text-sm text-cream-muted md:block">
                        Pasa el cursor sobre cada lado para ampliarlo.
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={active.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35 }}
                        className="mt-6 grid items-center gap-6 rounded-2xl border border-line bg-night-soft/80 p-6 lg:grid-cols-[auto_1fr] lg:gap-8 lg:p-8"
                    >
                        <ActiveIcon size={40} strokeWidth={1.25} className="text-gold" />
                        <p className="text-[clamp(1.05rem,1.2vw,1.2rem)] leading-relaxed text-cream/90">
                            {active.summary}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}