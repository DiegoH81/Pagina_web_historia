import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import type { ComparedWork } from '../../data/consequences'

type Side = 'before' | 'after'

interface BeforeAfterCompareProps
{
    id: string
    before: ComparedWork
    after: ComparedWork
}

const WIDTHS: Record<Side | 'none', string> = {
    none: '50%',
    before: '64%',
    after: '36%',
}

const SLANT = '4rem'

export function BeforeAfterCompare({ id, before, after }: BeforeAfterCompareProps)
{
    const [hovered, setHovered] = useState<Side | null>(null)

    return (
        <>
            <div className="grid gap-3 md:hidden">
                <div className="relative h-72 overflow-hidden rounded-2xl border-2 border-gold">
                    <ComparePane key={`${id}-before-m`} work={before} label="Antes" align="left" />
                </div>
                <div className="relative h-72 overflow-hidden rounded-2xl border-2 border-gold">
                    <ComparePane key={`${id}-after-m`} work={after} label="Después" align="left" />
                </div>
            </div>

            <div
                className="relative hidden h-[clamp(20rem,38vw,34rem)] md:flex overflow-hidden rounded-2xl border-2 border-gold bg-gold shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8),0_0_40px_rgba(212,162,76,0.15)]"
                onMouseLeave={() => setHovered(null)}
            >
                {/* Antes */}
                <motion.div
                    initial={false}
                    animate={{ width: WIDTHS[hovered ?? 'none'] }}
                    transition={{ type: 'spring', stiffness: 160, damping: 26 }}
                    onMouseEnter={() => setHovered('before')}
                    className="relative z-10 h-full shrink-0"
                    style={{ clipPath: `polygon(0 0, 100% 0, calc(100% - ${SLANT}) 100%, 0 100%)` }}
                >
                    <ComparePane key={`${id}-before`} work={before} label="Antes" align="left" />
                </motion.div>

                <div
                    onMouseEnter={() => setHovered('after')}
                    className="relative h-full flex-1"
                    style={{
                        marginLeft: `calc(-${SLANT} + 5px)`,
                        clipPath: `polygon(${SLANT} 0, 100% 0, 100% 100%, 0 100%)`,
                    }}
                >
                    <ComparePane key={`${id}-after`} work={after} label="Después" align="right" />
                </div>
            </div>
        </>
    )
}

interface ComparePaneProps
{
    work: ComparedWork
    label: string
    align: 'left' | 'right'
}

function ComparePane({ work, align }: ComparePaneProps)
{
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={work.image}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-night"
            >
                <img
                    src={work.image}
                    alt={work.imageAlt}
                    className="size-full object-cover"
                    style={{ objectPosition: work.focus ?? 'center' }}
                />

                <div
                    className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-night via-night/80 to-transparent pt-20 pb-6 ${
                        align === 'left' ? 'pr-6 pl-6 md:pr-20' : 'pr-6 pl-20 text-right'
                    }`}
                >
                    <p className="font-display text-[clamp(1.25rem,1.8vw,1.75rem)] leading-tight text-cream italic">
                        {work.title}
                    </p>
                    <p className="mt-1 text-[0.95rem] text-cream/75">
                        {work.author} · {work.date}
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
