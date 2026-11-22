interface FleurDeLisProps
{
    size?: number
    className?: string
}

export function FleurDeLis({ size = 22, className }: FleurDeLisProps)
{
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
            <path d="M12 2c-1.6 1.9-2.4 3.7-2.4 5.4 0 1.5.7 2.8 1.6 3.7H9.3c-.4-1.6-1.5-2.7-3-2.7-1.6 0-2.8 1.2-2.8 2.7 0 1.3.9 2.3 2.1 2.6-.3-.8.2-1.7 1.1-1.7.8 0 1.4.6 1.5 1.4H11v1.2H8.6v1.2H11v1.4c-.7.4-1.6 1.2-1.6 2.6 0 1.4 1.1 2.6 2.6 3.2 1.5-.6 2.6-1.8 2.6-3.2 0-1.4-.9-2.2-1.6-2.6v-1.4h2.4v-1.2H13v-1.2h2.8c.1-.8.7-1.4 1.5-1.4.9 0 1.4.9 1.1 1.7 1.2-.3 2.1-1.3 2.1-2.6 0-1.5-1.2-2.7-2.8-2.7-1.5 0-2.6 1.1-3 2.7h-1.9c.9-.9 1.6-2.2 1.6-3.7C14.4 5.7 13.6 3.9 12 2Z" />
        </svg>
    )
}
