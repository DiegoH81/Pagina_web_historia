import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

export function Conclusions()
{
    return (
        <section
            id="conclusiones"
            className="relative isolate flex min-h-svh items-end justify-center overflow-hidden bg-night px-6 pt-32 pb-24 text-cream before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-[3] before:h-[clamp(2.5rem,6vw,6rem)] before:bg-linear-to-b/srgb before:from-night before:to-transparent"
        >
            <motion.img
                src="/images/conclusions/escuela_de_atenas.webp"
                alt="La escuela de Atenas, de Rafael"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 8, ease: 'easeOut' }}
                className="absolute inset-0 -z-20 size-full object-cover object-[center_85%]"
            />

            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(26,18,24,0.5)_0%,rgba(26,18,24,0.15)_30%,rgba(26,18,24,0.75)_58%,rgba(26,18,24,0.97)_100%)]" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(26,18,24,0.7)_100%)]" />

            <div className="mx-auto max-w-5xl text-center">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-sm font-medium tracking-[0.3em] text-gold uppercase"
                >
                    IX · Conclusiones
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
                    className="mt-8 font-display text-[clamp(1.5rem,2.5vw,2.6rem)] leading-[1.35] text-cream [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]"
                >
                    <span className="text-gold italic">El Renacimiento</span> transformó la manera de comprender al ser
                    humano y su lugar en el mundo. Al recuperar las ideas de la Antigüedad y unirlas con nuevas formas de
                    observar, crear e investigar, abrió un camino que cambió para siempre el arte, el conocimiento y la
                    cultura occidental.
                </motion.p>
            </div>

            <p className="absolute right-6 bottom-6 text-right text-sm text-cream-muted lg:right-14">
                La escuela de Atenas · Rafael, 1509–1511
            </p>
        </section>
    )
}
