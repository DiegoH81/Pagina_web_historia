import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState, type KeyboardEvent } from 'react'
import { EventTimeline } from '../components/interactive/EventTimeline'
import { EVENTS } from '../data/events'

export function Discoveries()
{
    const [activeIndex, setActiveIndex] = useState(3)
    const event = EVENTS[activeIndex]
    const total = EVENTS.length

    const goTo = (index: number) =>
    {
        setActiveIndex((index + total) % total)
    }

    const handleKeyDown = (keyEvent: KeyboardEvent<HTMLElement>) =>
    {
        if (keyEvent.key === 'ArrowLeft')
            goTo(activeIndex - 1)
        if (keyEvent.key === 'ArrowRight')
            goTo(activeIndex + 1)
    }

    return (
        <section
            id="descubrimientos"
            onKeyDown={handleKeyDown}
            className="relative isolate flex min-h-svh flex-col overflow-hidden bg-night pt-16 text-cream"
        >
            <AnimatePresence>
                <motion.img
                    key={event.id}
                    src={event.image}
                    alt={event.imageAlt}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: 0.8 }, scale: { duration: 6, ease: 'easeOut' } }}
                    className="absolute inset-0 -z-20 size-full object-cover"
                    style={{ objectPosition: event.focus ?? 'center' }}
                />
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(26,18,24,0.95)_0%,rgba(26,18,24,0.75)_30%,rgba(26,18,24,0.15)_65%,transparent_100%)]" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-night/60 lg:hidden" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(26,18,24,1)_0%,rgba(26,18,24,0.85)_30%,transparent_60%)]" />

            <button
                type="button"
                aria-label="Acontecimiento anterior"
                onClick={() => goTo(activeIndex - 1)}
                className="absolute top-[42%] left-4 z-10 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full border-2 border-gold text-gold transition-colors hover:bg-gold hover:text-night lg:flex"
            >
                <ChevronLeft size={26} />
            </button>
            <button
                type="button"
                aria-label="Acontecimiento siguiente"
                onClick={() => goTo(activeIndex + 1)}
                className="absolute top-[42%] right-4 z-10 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full border-2 border-gold text-gold transition-colors hover:bg-gold hover:text-night lg:flex"
            >
                <ChevronRight size={26} />
            </button>

            <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-6 lg:px-24">
                <div className="relative flex flex-1 items-center py-12">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium tracking-[0.3em] text-cream/80 uppercase">
                            V · Novedades y descubrimientos
                        </p>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="mt-6 inline-block -skew-x-6 bg-accent px-5 py-1 shadow-[0_8px_20px_rgba(196,30,58,0.35)]">
                                    <span className="inline-block skew-x-6 font-display text-[clamp(1.6rem,2.4vw,2.4rem)] italic">
                                        {event.date}
                                    </span>
                                </span>

                                <h2 className="mt-4 font-display text-[clamp(2.8rem,5vw,5rem)] leading-[1.02] italic">
                                    {event.title}
                                </h2>

                                <p className="mt-5 max-w-xl text-[clamp(1.1rem,1.3vw,1.3rem)] leading-relaxed text-cream/90">
                                    {event.description}
                                </p>

                                <span className="mt-6 inline-block rounded-sm border border-gold px-4 py-1.5 text-sm font-medium tracking-[0.25em] text-gold uppercase">
                                    {event.place}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

                <div className="pb-10">
                    <EventTimeline events={EVENTS} activeIndex={activeIndex} onSelect={setActiveIndex} />
                </div>
            </div>
        </section>
    )
}
