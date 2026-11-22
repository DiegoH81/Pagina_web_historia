import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'
import type { KeyboardEvent } from 'react'
import type { ContributionArea } from '../../data/contributions'

interface ContributionCarouselProps
{
    areas: ContributionArea[]
    activeIndex: number
    onChange: (index: number) => void
    onOpen: (areaId: string) => void
}

function getOffset(index: number, activeIndex: number, total: number)
{
    const half = Math.floor(total / 2)
    return ((index - activeIndex + total + half) % total) - half
}

export function ContributionCarousel({ areas, activeIndex, onChange, onOpen }: ContributionCarouselProps)
{
    const total = areas.length

    const goTo = (index: number) =>
    {
        onChange((index + total) % total)
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) =>
    {
        if (event.key === 'ArrowLeft')
            goTo(activeIndex - 1)
        if (event.key === 'ArrowRight')
            goTo(activeIndex + 1)
    }

    return (
        <div onKeyDown={handleKeyDown}>
            <div className="relative h-[clamp(20rem,30vw,28rem)] [perspective:1600px]">
                {areas.map((area, index) =>
                {
                    const offset = getOffset(index, activeIndex, total)
                    const distance = Math.abs(offset)
                    const isActive = offset === 0
                    const Icon = area.icon
                    const cover = area.works[0]

                    return (
                        <motion.button
                            key={area.id}
                            type="button"
                            aria-label={`${area.title}: ver aporte`}
                            onClick={() => onOpen(area.id)}
                            initial={false}
                            animate={{
                                x: `${offset * 78 - 50}%`,
                                rotateY: offset * -14,
                                scale: 1 - distance * 0.1,
                                opacity: distance > 2 ? 0.55 : 1,
                            }}
                            whileHover={{ y: -10 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                            style={{ zIndex: 10 - distance }}
                            className={`group absolute top-1/2 left-1/2 aspect-[3/4] w-[clamp(10rem,15vw,15rem)] -translate-y-1/2 cursor-pointer overflow-hidden rounded-xl border text-left shadow-[0_24px_40px_-12px_rgba(42,31,26,0.55)] outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                                isActive ? 'border-accent/60' : 'border-ink/10'
                            }`}
                        >
                            <img
                                src={cover.image}
                                alt={cover.imageAlt}
                                draggable={false}
                                className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <div
                                className={`absolute inset-x-0 bottom-0 flex items-center gap-2.5 px-4 pt-10 pb-4 text-cream ${
                                    isActive
                                        ? 'bg-linear-to-t from-[#5c1220] via-[#5c1220]/90 to-transparent'
                                        : 'bg-linear-to-t from-ink/90 via-ink/70 to-transparent'
                                }`}
                            >
                                <Icon size={isActive ? 22 : 18} strokeWidth={1.5} className="shrink-0" />
                                <span
                                    className={`font-display leading-tight ${
                                        isActive ? 'text-[clamp(1.1rem,1.4vw,1.4rem)]' : 'text-[clamp(0.95rem,1.1vw,1.1rem)]'
                                    }`}
                                >
                                    {area.title}
                                </span>
                            </div>
                        </motion.button>
                    )
                })}

                <button
                    type="button"
                    aria-label="Aporte anterior"
                    onClick={() => goTo(activeIndex - 1)}
                    className="absolute top-1/2 left-0 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-ink/20 bg-cream text-ink shadow-md transition-colors hover:border-accent hover:text-accent"
                >
                    <ChevronLeft size={22} />
                </button>
                <button
                    type="button"
                    aria-label="Aporte siguiente"
                    onClick={() => goTo(activeIndex + 1)}
                    className="absolute top-1/2 right-0 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-ink/20 bg-cream text-ink shadow-md transition-colors hover:border-accent hover:text-accent"
                >
                    <ChevronRight size={22} />
                </button>
            </div>

            <div className="mt-8 flex justify-center gap-2.5">
                {areas.map((area, index) => (
                    <button
                        key={area.id}
                        type="button"
                        aria-label={`Ir a ${area.title}`}
                        aria-current={index === activeIndex}
                        onClick={() => goTo(index)}
                        className={`h-2.5 rounded-full transition-all ${
                            index === activeIndex ? 'w-8 bg-accent' : 'w-2.5 bg-ink/25 hover:bg-ink/45'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}
