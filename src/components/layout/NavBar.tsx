import { SECTIONS } from '../../data/sections'

export function Navbar()
{
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-night/80 backdrop-blur-md">
            <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 lg:px-14">
                <a href="#inicio" className="font-display text-2xl">
                    Renacimiento
                </a>

                <ul className="flex gap-7">
                    {SECTIONS.map((section) => (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                className="text-base text-cream-muted transition-colors hover:text-cream"
                            >
                                {section.short}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}