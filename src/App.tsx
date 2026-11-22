import { Navbar } from "./components/layout/NavBar"
import { SECTIONS } from "./data/sections"

import { Hero } from "./sections/Hero"
import { Introduction } from './sections/Introduction'
import { Causes } from './sections/Causes'
import { Contributions } from './sections/Contributions'


function App()
{
  return (
    <>
        <Navbar />
        <main>
            <Hero/>
            <Introduction />
            <Causes />
            <Contributions />


            
        </main>
    </>
  )
}

export default App