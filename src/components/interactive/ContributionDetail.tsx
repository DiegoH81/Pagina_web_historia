import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { ContributionArea } from '../../data/contributions'

interface ContributionDetailProps
{
    area: ContributionArea
    workIndex: number
    onBack: () => void
    onSelectWork: (index: number) => void
}

export function ContributionDetail({ area, workIndex, onBack, onSelectWork }: ContributionDetailProps)
{
    const total = area.works.length
    const work = area.works[workIndex]
    const Icon = area.icon

    // Siempre se listan las otras obras del área (no la que se está viendo)
    const otherWorks = area.works
        .map((item, index) => ({ item, index }))
        .filter(({ index }) => index !== workIndex)

    const goTo = (index: number) =>
    {
        onSelectWork((index + total) % total)
    }

    return (
        <div className="grid overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-[0_40px_80px_-24px_rgba(42,31,26,0.55),0_12px_24px_-12px_rgba(42,31,26,0.35)] lg:grid-cols-[1.1fr_1fr]">
            <div className="relative min-h-[50vh] overflow-hidden bg-night lg:min-h-[72vh]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={work.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={work.image}
                            alt=""
                            className="absolute inset-0 size-full scale-110 object-cover opacity-50 blur-2xl"
                        />
                        <motion.img
                            src={work.image}
                            alt={work.imageAlt}
                            initial={{ scale: 1.04 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 size-full object-contain px-6 pt-20 pb-24 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Oscurece arriba y abajo para que se lean los controles */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(26,18,24,0.7),transparent_22%,transparent_72%,rgba(26,18,24,0.9))]" />

                <button
                    type="button"
                    onClick={onBack}
                    className="absolute top-5 left-5 z-10 flex items-center gap-2 rounded-full border border-cream/30 bg-night/60 px-4 py-2 text-base text-cream backdrop-blur-sm transition-colors hover:bg-night"
                >
                    <ArrowLeft size={18} />
                    Volver a la galería
                </button>

                <div className="absolute right-5 bottom-5 z-10 flex items-center gap-4 text-cream">
                    <button
                        type="button"
                        aria-label="Obra anterior"
                        onClick={() => goTo(workIndex - 1)}
                        className="flex size-11 items-center justify-center rounded-full border border-cream/40 transition-colors hover:bg-cream/15"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="min-w-14 text-center font-medium tabular-nums">
                        {String(workIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                    <button
                        type="button"
                        aria-label="Obra siguiente"
                        onClick={() => goTo(workIndex + 1)}
                        className="flex size-11 items-center justify-center rounded-full border border-cream/40 transition-colors hover:bg-cream/15"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={work.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col p-8 text-ink lg:p-12"
                >
                    
                    <div className="flex items-center gap-3 text-accent">
                        <Icon size={22} strokeWidth={1.5} />
                        <span className="text-sm font-semibold tracking-[0.25em] uppercase">{area.title}</span>
                    </div>

                    <h3 className="mt-5 font-display text-[clamp(2rem,3.2vw,3.25rem)] leading-[1.08] italic">
                        {work.title}
                    </h3>
                    <p className="mt-3 font-display text-xl">
                        {work.author} <span className="text-[#a07a45]">· {work.date}</span>
                    </p>

                    
                    <p className="mt-6 font-display text-[clamp(1.2rem,1.5vw,1.45rem)] leading-snug text-accent">
                        {area.summary}
                    </p>
                    <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/80">{work.description}</p>

                    <div className="mt-auto pt-8">
                        <p className="border-t border-ink/15 pt-6 text-sm font-semibold tracking-[0.25em] text-accent uppercase">
                            Explorar otras obras
                        </p>
                        <div className="mt-3 divide-y divide-ink/10">
                            {otherWorks.map(({ item, index }) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => onSelectWork(index)}
                                    className="group flex w-full items-center gap-4 py-3 text-left"
                                >
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="h-16 w-24 shrink-0 rounded-md object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <span className="flex-1">
                                        <span className="block font-display text-lg leading-snug transition-colors group-hover:text-accent">
                                            {item.title}
                                        </span>
                                        <span className="block text-sm text-ink/60">{item.author}</span>
                                    </span>
                                    <ChevronRight
                                        size={20}
                                        className="shrink-0 text-ink/40 transition-all group-hover:translate-x-1 group-hover:text-accent"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
