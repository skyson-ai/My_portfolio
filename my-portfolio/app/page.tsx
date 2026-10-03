import { resolveLanguage } from "@/lib/language"
import { Cursor } from "@/components/portfolio/cursor"
import { Header } from "@/components/portfolio/header"
import { Home } from "@/components/portfolio/home"
import { About } from "@/components/portfolio/about"
import { Projects } from "@/components/portfolio/projects"
import { Work } from "@/components/portfolio/work"
import { Services } from "@/components/portfolio/services"
import { Achievements } from "@/components/portfolio/achievements"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"

export default function Page() {
  const lang = resolveLanguage()

  return (
    <>
      <Cursor />

      <Header lang={lang} />

      <main className="main">
        <Home lang={lang} />
        <About lang={lang} />
        <Projects lang={lang} />
        <Work lang={lang} />
        <Services lang={lang} />
        <Achievements lang={lang} />
        <Contact lang={lang} />
      </main>

      <Footer lang={lang} />
    </>
  )
}
