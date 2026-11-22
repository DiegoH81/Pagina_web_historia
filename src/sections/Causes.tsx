import { useState } from 'react'
import { CauseItem } from '../components/interactive/CauseItem'
import { CAUSES } from '../data/causes'

export function Causes()
{
    const [activeId, setActiveId] = useState<string | null>(null)

    return (
        <section
            id="causas"
            className="relative overflow-hidden bg-[url('/images/causes/mesa_madera.webp')] bg-cover bg-center py-24 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-[3] before:h-[clamp(1.5rem,3vw,3.25rem)] before:bg-linear-to-b/srgb before:from-night before:to-transparent before:via-night/40 before:via-[35%] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-[3] after:h-[clamp(1.5rem,3vw,3.25rem)] after:bg-linear-to-t/srgb after:from-cream after:to-transparent after:via-cream/50 after:via-[40%]"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(10,6,8,0.85)_100%)]" />

            <div className="relative mx-auto max-w-[1600px] px-6 lg:px-14">
                <div className="max-w-2xl">
                    <p className="mb-5 text-sm font-medium tracking-[0.2em] text-accent-light uppercase">
                        III · Causas
                    </p>
                    <h2 className="font-display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.05]">
                        ¿Por qué surgió el Renacimiento?
                    </h2>
                    <p className="mt-6 text-lg text-cream-muted">
                        <span className="hidden lg:inline">Pasa el cursor sobre cada objeto para descubrir su historia.</span>
                        <span className="lg:hidden">Cada objeto representa una de las causas del Renacimiento.</span>
                    </p>
                </div>

                <div className="@container relative mt-10 hidden aspect-[16/9] lg:block">
                    {CAUSES.map((cause) => (
                        <CauseItem
                            key={cause.id}
                            cause={cause}
                            isActive={activeId === cause.id}
                            isDimmed={activeId !== null && activeId !== cause.id}
                            onActivate={setActiveId}
                        />
                    ))}
                </div>

                <div className="mt-12 grid gap-10 lg:hidden">
                    {CAUSES.map((cause) => {
                        const Icon = cause.icon
                        return (
                            <article key={cause.id} className="grid gap-5">
                                <img
                                    src={cause.image}
                                    alt={cause.imageAlt}
                                    className="mx-auto w-2/3 drop-shadow-[0_18px_22px_rgba(0,0,0,0.6)]"
                                />
                                <div className="border-l-4 border-accent bg-cream p-5 text-ink">
                                    <div className="flex items-center gap-3">
                                        <Icon size={22} className="text-accent" strokeWidth={1.5} />
                                        <h3 className="font-display text-2xl">{cause.title}</h3>
                                    </div>
                                    <p className="mt-3 leading-relaxed text-ink/85">{cause.description}</p>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}