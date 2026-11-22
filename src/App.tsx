import { Navbar } from "./components/layout/NavBar"

import { Hero } from "./sections/Hero"
import { Introduction } from './sections/Introduction'
import { Causes } from './sections/Causes'
import { Contributions } from './sections/Contributions'
import { Discoveries } from './sections/Discoveries'


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
            <Discoveries />


            
        </main>
    </>
  )
}

export default App