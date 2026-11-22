import { Navbar } from "./components/layout/NavBar"
import { SECTIONS } from "./data/sections"

import { Hero } from "./sections/Hero"
import { Introduction } from './sections/Introduction'
import { Causes } from './sections/Causes'


function App()
{
  return (
    <>
        <Navbar />
        <main>
            <Hero/>
            <Introduction />
            <Causes />

            {SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="flex min-h-screen items-center px-6">
                <h2 className="font-display text-5xl">
                {section.number}. {section.title}
                </h2>
            </section>
            ))}
        </main>
    </>
  )
}

export default App