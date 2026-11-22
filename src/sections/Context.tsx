import { lazy, Suspense, useEffect, useRef, useState } from "react";

const EnvironmentViewer = lazy(() => import("../three/components/EnvironmentViewer"));

export function Context()
{
    const section = useRef<HTMLElement>(null);
    const [readyToLoad, setReadyToLoad] = useState(false);

    useEffect(() =>
    {
        const element = section.current;
        if (!element)
            return;

        const observer = new IntersectionObserver(([entry]) =>
        {
            if (!entry.isIntersecting)
                return;

            setReadyToLoad(true);
            observer.disconnect();
        }, { rootMargin: "320px 0px" });

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={section} id="entorno" aria-label="Entorno del Renacimiento" className="min-h-[calc(100svh-4rem)] scroll-mt-16 bg-night-soft">
            {readyToLoad && (
                <Suspense fallback={<p className="p-6 text-cream-muted" role="status">Preparando la maqueta…</p>}>
                    <EnvironmentViewer />
                </Suspense>
            )}
        </section>
    );
}
