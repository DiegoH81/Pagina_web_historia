import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'link'

interface ButtonProps {
    href: string
    children: ReactNode
    variant?: ButtonVariant
}

const VARIANTS: Record<ButtonVariant, string> = {
    primary: 'bg-accent px-7 py-4 font-medium text-cream hover:bg-accent/85',
    link: 'border-b border-cream-muted pb-1 text-cream hover:border-cream',
}

export function Button({ href, children, variant = 'primary' }: ButtonProps)
{
    return (
        <a href={href} className={`inline-block text-base transition-colors ${VARIANTS[variant]}`}>
        {children}
        </a>
    )
}