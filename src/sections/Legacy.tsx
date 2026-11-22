import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { LegacyMap } from '../components/interactive/LegacyMap'
import { PLACES } from '../data/legacy'

export function Legacy()
{
    const [activeId, setActiveId] = useState<string | null>('florencia')
    const place = PLACES.find((item) => item.id === activeId)

    return (
        <section id="influencia" className="relative overflow-hidden bg-night py-24 text-cream">
            <div className="relative mx-auto max-w-[1600px] px-6 lg:px-14">
                <p className="text-sm font-medium tracking-[0.3em] text-cream/80 uppercase">VIII · Influencia en Occidente</p>
                <h2 className="mt-3 font-display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.05]">
                    La difusión del <span className="text-gold">Renacimiento</span>
                </h2>
                <p className="mt-3 max-w-3xl text-[clamp(1.1rem,1.3vw,1.3rem)] text-cream-muted">
                    Desde Italia, las nuevas ideas se extendieron por Europa y llegaron a América. Selecciona una
                    ciudad para conocer su papel.
                </p>

                <div className="mt-12 grid items-start gap-6 xl:grid-cols-[1fr_24rem]">
                    <LegacyMap activeId={activeId} onSelect={setActiveId} />

                    <AnimatePresence mode="wait">
                        {place ? (
                            <motion.article
                                key={place.id}
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 12 }}
                                transition={{ duration: 0.35 }}
                                className="relative rounded-2xl border border-ink/10 bg-cream p-6 text-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] xl:sticky xl:top-24"
                            >
                                <button
                                    type="button"
                                    aria-label="Cerrar ficha"
                                    onClick={() => setActiveId(null)}
                                    className="absolute top-5 right-5 text-ink/60 transition-colors hover:text-accent"
                                >
                                    <X size={24} />
                                </button>

                                <h3 className="pr-8 font-display text-[clamp(2rem,2.6vw,2.6rem)] leading-tight">
                                    {place.name}
                                </h3>

                                <img
                                    src={place.image}
                                    alt={place.imageAlt}
                                    className="mt-5 aspect-[16/10] w-full rounded-xl object-cover shadow-md"
                                />

                                <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink/85">{place.description}</p>
                                <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink/70">{place.highlights}</p>
                            </motion.article>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="rounded-2xl border border-dashed border-line p-8 text-center text-cream-muted"
                            >
                                Selecciona una ciudad en el mapa para ver su ficha.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
