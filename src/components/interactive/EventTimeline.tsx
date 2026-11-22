import { motion } from 'motion/react'
import type { HistoricalEvent } from '../../data/events'

interface EventTimelineProps
{
    events: HistoricalEvent[]
    activeIndex: number
    onSelect: (index: number) => void
}

export function EventTimeline({ events, activeIndex, onSelect }: EventTimelineProps)
{
    const progress = events.length > 1 ? activeIndex / (events.length - 1) : 0

    return (
        <div className="overflow-x-auto pt-4 pb-4 [scrollbar-width:thin]">
            <div className="relative mx-auto min-w-[56rem]">
                <div className="absolute top-[calc(9rem-1px)] left-[6.25%] h-0.5 w-[87.5%] bg-gold/25" />
                <motion.div
                    className="absolute top-[calc(9rem-1px)] left-[6.25%] h-0.5 w-[87.5%] origin-left bg-gold"
                    initial={false}
                    animate={{ scaleX: progress }}
                    transition={{ type: 'spring', stiffness: 120, damping: 24 }}
                />

                <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${events.length}, minmax(0, 1fr))` }}>
                    {events.map((event, index) =>
                    {
                        const isActive = index === activeIndex
                        const isPast = index <= activeIndex

                        return (
                            <li key={event.id} className="flex flex-col items-center">
                                <button
                                    type="button"
                                    onClick={() => onSelect(index)}
                                    aria-label={`${event.date}: ${event.title}`}
                                    aria-current={isActive}
                                    className="group flex flex-col items-center text-center outline-none"
                                >
                                    <motion.span
                                        initial={false}
                                        animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -6 : 0 }}
                                        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                                        className={`block size-28 overflow-hidden rounded-full border-[3px] transition-shadow group-hover:border-gold group-focus-visible:ring-4 group-focus-visible:ring-gold/50 ${
                                            isActive
                                                ? 'border-gold shadow-[0_0_0_4px_rgba(212,162,76,0.25),0_0_40px_rgba(212,162,76,0.45)]'
                                                : 'border-gold/60 shadow-[0_10px_25px_rgba(0,0,0,0.6)]'
                                        }`}
                                    >
                                        <img
                                            src={event.image}
                                            alt=""
                                            className={`size-full object-cover transition-[filter] duration-500 ${
                                                isActive ? '' : 'brightness-75 group-hover:brightness-100'
                                            }`}
                                            style={{ objectPosition: event.focus ?? 'center' }}
                                        />
                                    </motion.span>

                                    <span className="mt-5 flex h-6 items-center justify-center">
                                        <span
                                            className={`block rounded-full transition-all duration-300 ${
                                                isActive
                                                    ? 'size-6 border-4 border-gold bg-cream shadow-[0_0_16px_rgba(212,162,76,0.8)]'
                                                    : isPast
                                                      ? 'size-4 bg-gold'
                                                      : 'size-4 bg-gold/40'
                                            }`}
                                        />
                                    </span>

                                    <span
                                        className={`mt-4 rounded-md px-3 py-0.5 font-display text-[1.35rem] leading-tight transition-colors ${
                                            isActive ? 'bg-accent text-cream' : 'text-cream'
                                        }`}
                                    >
                                        {event.date}
                                    </span>
                                    <span
                                        className={`mt-2 max-w-[10rem] font-display text-base leading-snug transition-colors ${
                                            isActive ? 'text-cream' : 'text-cream-muted group-hover:text-cream'
                                        }`}
                                    >
                                        {event.shortTitle}
                                    </span>
                                </button>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}
