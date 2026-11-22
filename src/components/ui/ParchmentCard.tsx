import { Feather, type LucideIcon } from 'lucide-react'
import { useId, type ReactNode } from 'react'

interface ParchmentCardProps {
    title: string
    children: ReactNode
    label?: string
    icon?: LucideIcon
}

const PAPER_NOISE =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3CfeColorMatrix values='0 0 0 0 0.42 0 0 0 0 0.27 0 0 0 0 0.1 0 0 0 0.16 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export function ParchmentCard({ title, children, label, icon: Icon = Feather }: ParchmentCardProps)
{
    const filterId = `torn-${useId().replace(/:/g, '')}`

    return (
        <div className="relative drop-shadow-[0_22px_28px_rgba(0,0,0,0.55)]">
            <svg className="absolute size-0" aria-hidden="true">
                <filter id={filterId}>
                    <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="7" />
                    <feDisplacementMap in="SourceGraphic" scale="14" />
                </filter>
            </svg>

            <div
                className="absolute inset-0"
                style={{
                    filter: `url(#${filterId})`,
                    backgroundColor: '#ead3a8',
                    backgroundImage: `${PAPER_NOISE}, radial-gradient(ellipse at 40% 35%, #f6e7c8 0%, #ecd6ac 55%, #d9b67f 100%)`,
                    boxShadow: 'inset 0 0 40px rgba(120, 70, 20, 0.45)',
                }}
            />

            <div className="absolute inset-3 border border-[#8a5a2b]/50" />
            <div className="absolute inset-[17px] border border-[#8a5a2b]/30" />

            <div
                className="absolute -top-2 left-7 flex h-20 w-12 items-start justify-center bg-linear-to-b from-[#9e1f2c] to-[#6e1420] pt-4 shadow-md"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)' }}
            >
                <Icon size={20} strokeWidth={1.5} className="text-[#f3d9a8]" />
            </div>

            <div className="relative px-9 pt-7 pb-8 text-[#3b2314]">
                <h3 className="pl-16 font-display text-[clamp(1.5rem,2cqw,2.1rem)] leading-tight font-medium">
                    {title}
                </h3>

                <div className="mt-4 flex items-center gap-3 text-[#9a6a35]">
                    <span className="h-px flex-1 bg-current opacity-70" />
                    <FleurDeLis />
                    <span className="h-px flex-1 bg-current opacity-70" />
                </div>

                <p className="mt-4 font-display text-[clamp(1.05rem,1.15cqw,1.2rem)] leading-relaxed text-[#4a2e1a]">
                    {children}
                </p>

                {label && (
                    <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-[#8e1b2a] uppercase">{label}</p>
                )}
            </div>
        </div>
    )
}

function FleurDeLis()
{
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2c-1.6 1.9-2.4 3.7-2.4 5.4 0 1.5.7 2.8 1.6 3.7H9.3c-.4-1.6-1.5-2.7-3-2.7-1.6 0-2.8 1.2-2.8 2.7 0 1.3.9 2.3 2.1 2.6-.3-.8.2-1.7 1.1-1.7.8 0 1.4.6 1.5 1.4H11v1.2H8.6v1.2H11v1.4c-.7.4-1.6 1.2-1.6 2.6 0 1.4 1.1 2.6 2.6 3.2 1.5-.6 2.6-1.8 2.6-3.2 0-1.4-.9-2.2-1.6-2.6v-1.4h2.4v-1.2H13v-1.2h2.8c.1-.8.7-1.4 1.5-1.4.9 0 1.4.9 1.1 1.7 1.2-.3 2.1-1.3 2.1-2.6 0-1.5-1.2-2.7-2.8-2.7-1.5 0-2.6 1.1-3 2.7h-1.9c.9-.9 1.6-2.2 1.6-3.7C14.4 5.7 13.6 3.9 12 2Z" />
        </svg>
    )
}
