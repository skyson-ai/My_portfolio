"use client"

import { useEffect, useState } from "react"
import { navLinks, siteConfig } from "@/lib/portfolio-data"
import { getDictionary, pick, type Lang } from "@/lib/i18n"
import { LanguageToggle } from "./language-toggle"

export function Header({ lang }: { lang: Lang }) {
  const [active, setActive] = useState("home")
  const dict = getDictionary(lang)

  useEffect(() => {
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActive(visible.target.id)
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))

    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="header">
      <div className="blob-animate" />

      <nav className="nav container" aria-label={dict.nav.ariaLabel}>
        <a
          href="#home"
          className="nav__logo"
          onClick={(event) => {
            event.preventDefault()
            goTo("home")
          }}
        >
          {siteConfig.logo}
        </a>

        <ul className="nav__list">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                className={`nav__link ${active === id ? "active-link" : ""}`}
                aria-current={active === id ? "true" : undefined}
                onClick={() => goTo(id)}
              >
                {pick(label, lang)}
              </button>
            </li>
          ))}
        </ul>

        <LanguageToggle lang={lang} />
      </nav>
    </header>
  )
}