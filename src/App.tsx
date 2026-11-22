import { Navbar } from "./components/layout/NavBar"

import { Hero } from "./sections/Hero"
import { Introduction } from './sections/Introduction'
import { Causes } from './sections/Causes'
import { Contributions } from './sections/Contributions'
import { Discoveries } from './sections/Discoveries'
import { Consequences } from './sections/Consequences'
import { Legacy } from './sections/Legacy'
import { Conclusions } from './sections/Conclusions'


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
            <Consequences />
            <Legacy />
            <Conclusions />
        </main>
    </>
  )
}

export default App