import { Button } from '../components/ui/Button'

export function Hero()
{
    return (
        <section id="inicio" className="relative overflow-hidden pt-16 lg:h-svh lg:min-h-[640px]">
            <div className="@container relative mx-auto h-full max-w-[1600px] px-6 lg:px-14">
                <div className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[70cqw] -translate-x-[40%] -translate-y-1/2 bg-[radial-gradient(circle,rgba(196,140,90,0.16),transparent_62%)]" />

                <img
                    src="/images/hero/dama_armino.webp"
                    alt="La dama del armiño, de Leonardo da Vinci"
                    className="relative mx-auto mt-10 w-[85%] max-w-md [mask-image:linear-gradient(to_bottom,black_72%,transparent)] lg:absolute lg:bottom-0 lg:left-1/2 lg:z-10 lg:mt-0 lg:h-[min(calc(100svh-7rem),62cqw)] lg:w-auto lg:max-w-none lg:-translate-x-[40%]"
                />

                <div className="relative z-20 flex h-full items-center justify-between pt-10 lg:pt-0">
                    <div>
                        <p className="mb-5 text-sm font-medium tracking-[0.2em] text-accent-light uppercase">
                            Museo digital
                        </p>
                        <h1 className="font-display text-[clamp(3rem,7.2cqw,7rem)] leading-none tracking-tight">
                            Renacimiento
                        </h1>
                        <p className="mt-8 max-w-xl text-[clamp(1.125rem,1.25cqw,1.375rem)] leading-relaxed text-cream-muted lg:max-w-[34cqw]">
                            ¿En qué medida el Renacimiento fue una transformación importante en Europa y cuál fue
                            su influencia en la historia de Occidente?
                        </p>
                        <div className="mt-10 flex items-center gap-7">
                            <Button href="#introduccion">Comenzar recorrido</Button>
                            <Button href="#entorno" variant="link">
                                Ver el mapa
                            </Button>
                        </div>
                    </div>

                    <div className="hidden flex-col items-end text-right lg:flex">
                        <p className="font-display text-[clamp(3rem,5cqw,5.5rem)] leading-none">1300</p>
                        <span className="my-5 mr-[1.3cqw] h-14 w-px bg-accent" />
                        <p className="font-display text-[clamp(3rem,5cqw,5.5rem)] leading-none">1600</p>
                        <p className="mt-6 text-sm tracking-[0.2em] text-cream-muted uppercase">Italia - Europa</p>
                    </div>
                </div>

                <div className="absolute inset-x-14 bottom-8 z-20 hidden items-end justify-between text-sm text-cream-muted lg:flex">
                    <p className="flex items-center gap-4 tracking-[0.2em] uppercase">
                        <span className="h-px w-12 bg-cream-muted" />
                        Desliza para explorar
                    </p>
                    <p className="text-right leading-relaxed">
                        La dama del armiño
                        <br />
                        Leonardo da Vinci, c. 1489–1491
                    </p>
                </div>
            </div>
        </section>
    )
}