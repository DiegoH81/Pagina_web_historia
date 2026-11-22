import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import { ContributionCarousel } from '../components/interactive/ContributionCarousel'
import { ContributionDetail } from '../components/interactive/ContributionDetail'
import { CONTRIBUTIONS } from '../data/contributions'

export function Contributions()
{
    const sectionRef = useRef<HTMLElement>(null)

    const [activeIndex, setActiveIndex] = useState(2)
    const [openAreaId, setOpenAreaId] = useState<string | null>(null)
    const [workIndex, setWorkIndex] = useState(0)

    const openArea = CONTRIBUTIONS.find((area) => area.id === openAreaId)

    const scrollToTop = () =>
    {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const handleOpen = (areaId: string) =>
    {
        setActiveIndex(CONTRIBUTIONS.findIndex((area) => area.id === areaId))
        setWorkIndex(0)
        setOpenAreaId(areaId)
        scrollToTop()
    }

    const handleBack = () =>
    {
        setOpenAreaId(null)
        scrollToTop()
    }

    return (
        <section id="aportes" ref={sectionRef} className="relative overflow-hidden bg-cream py-24 text-ink">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,250,240,0.9),transparent_70%)]" />

            <div className="relative mx-auto max-w-[1600px] px-6 lg:px-14">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-medium tracking-[0.25em] text-accent uppercase">IV · Aportes y cambios</p>
                    <h2 className="mt-4 font-display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.05]">
                        Galería de <span className="text-accent">aportes</span>
                    </h2>
                    <p className="mt-5 text-lg text-ink/70">
                        Principales contribuciones en el arte, la ciencia y el pensamiento de la época.
                    </p>
                </div>

                <div className="mt-14">
                    <AnimatePresence mode="wait">
                        {openArea ? (
                            <motion.div
                                key="detail"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ContributionDetail
                                    area={openArea}
                                    workIndex={workIndex}
                                    onBack={handleBack}
                                    onSelectWork={setWorkIndex}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="gallery"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ContributionCarousel
                                    areas={CONTRIBUTIONS}
                                    activeIndex={activeIndex}
                                    onChange={setActiveIndex}
                                    onOpen={handleOpen}
                                />
                                <p className="mt-6 text-center text-base text-ink/60">
                                    Haz clic en una tarjeta para ver el aporte y sus obras.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
