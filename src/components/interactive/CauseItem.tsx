import { AnimatePresence, motion } from 'motion/react'
import type { Cause } from '../../data/causes'
import { ParchmentCard } from '../ui/ParchmentCard'

interface CauseItemProps
{
    cause: Cause
    isActive: boolean
    isDimmed: boolean
    onActivate: (id: string | null) => void
}

export function CauseItem({ cause, isActive, isDimmed, onActivate }: CauseItemProps)
{
    const { left, top, width, rotate } = cause.position

    return (
        <div
            className="absolute"
            style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, zIndex: isActive ? 30 : 10 }}
        >
            <motion.button
                type="button"
                aria-label={`${cause.title}: ver explicación`}
                aria-expanded={isActive}
                onMouseEnter={() => onActivate(cause.id)}
                onMouseLeave={() => onActivate(null)}
                onFocus={() => onActivate(cause.id)}
                onBlur={() => onActivate(null)}
                onClick={() => onActivate(isActive ? null : cause.id)}
                animate={{
                    rotate: isActive ? 0 : rotate,
                    scale: isActive ? 1.06 : 1,
                    y: isActive ? -8 : 0,
                    opacity: isDimmed ? 0.45 : 1,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="block w-full cursor-pointer outline-none"
            >
                <img
                    src={cause.image}
                    alt={cause.imageAlt}
                    draggable={false}
                    className={`w-full transition-[filter] duration-300 ${
                        isActive
                            ? 'drop-shadow-[0_0_28px_rgba(255,170,80,0.55)]'
                            : 'drop-shadow-[0_18px_22px_rgba(0,0,0,0.6)]'
                    }`}
                />
            </motion.button>

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, x: cause.cardSide === 'right' ? -16 : 16, rotate: cause.cardSide === 'right' ? -2 : 2 }}
                        animate={{ opacity: 1, x: 0, rotate: cause.cardSide === 'right' ? -1 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className={`pointer-events-none absolute top-[8%] w-[min(27rem,30cqw)] ${
                            cause.cardSide === 'right' ? 'left-[calc(100%+1.5rem)]' : 'right-[calc(100%+1.5rem)]'
                        }`}
                    >
                        <ParchmentCard title={cause.title} label={`Causa ${cause.type}`} icon={cause.icon}>
                            {cause.description}
                        </ParchmentCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
