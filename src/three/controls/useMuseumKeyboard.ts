import { useEffect } from "react";

export function useMuseumKeyboard(stage: number, choose: (next: number) => void)
{
    useEffect(() =>
    {
        function handleKeyDown(event: KeyboardEvent)
        {
            const element = document.getElementById("personajes");
            if (!element)
                return;

            const bounds = element.getBoundingClientRect();
            if (bounds.bottom <= 64 || bounds.top >= window.innerHeight)
                return;

            const active = document.activeElement;
            if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement || active instanceof HTMLSelectElement || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey)
                return;

            if (event.key === "ArrowRight")
                choose(stage + 1);
            else if (event.key === "ArrowLeft")
                choose(stage - 1);
            else if (event.key === "Escape")
                choose(-1);
            else
                return;

            event.preventDefault();
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [choose, stage]);
}
