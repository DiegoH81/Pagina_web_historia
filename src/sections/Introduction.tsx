import { ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

export function Introduction()
{
    const sectionRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })

    const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

    return (
        <section
            id="introduccion"
            ref={sectionRef}
            className="relative overflow-hidden bg-cream text-ink lg:min-h-svh"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-48 bg-linear-to-b from-night to-transparent lg:h-64" />

            <div className="relative h-[55vh] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[62%]">
                <motion.img
                    src="/images/introduction/florencia.webp"
                    alt="Florencia con la cúpula de Santa Maria del Fiore, obra de Brunelleschi"
                    style={{ y: imageY }}
                    className="size-full scale-110 object-cover mask-intersect [mask-image:linear-gradient(to_right,transparent_10%,black_45%),linear-gradient(to_bottom,transparent,black_50%)]"
                />
                
            </div>

            <div className="relative z-20 mx-auto max-w-[1600px] px-6 pt-10 pb-24 lg:flex lg:min-h-svh lg:items-center lg:px-14 lg:pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-2xl"
                >
                    <p className="mb-5 text-sm font-medium tracking-[0.2em] text-accent uppercase">Introducción</p>
                    <h2 className="font-display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.05]">
                        Un nuevo modo de entender el mundo
                    </h2>
                    <span className="mt-8 block h-0.5 w-16 bg-accent" />
                    <p className="mt-8 max-w-xl text-[clamp(1.125rem,1.3vw,1.3rem)] leading-relaxed text-ink/80">
                        El Renacimiento fue un movimiento cultural, artístico e intelectual que floreció en Europa
                        entre los siglos XIV y XVI, y que propuso una nueva mirada sobre el ser humano, la
                        naturaleza y el conocimiento.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}