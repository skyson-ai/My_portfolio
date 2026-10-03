"use client"

import { useCallback, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/lib/portfolio-data"
import { getDictionary, pick, type Lang } from "@/lib/i18n"

export function Projects({ lang }: { lang: Lang }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dict = getDictionary(lang)
  const [title, accent] = dict.projects.title

  const scrollBy = useCallback((direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return

    const card = track.querySelector<HTMLElement>(".projects__card")
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8
    track.scrollBy({ left: step * direction, behavior: "smooth" })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") scrollBy(1)
      if (event.key === "ArrowLeft") scrollBy(-1)
    }

    track.addEventListener("keydown", onKeyDown)

    return () => track.removeEventListener("keydown", onKeyDown)
  }, [scrollBy])

  return (
    <section id="projects" className="projects container section">
      <div className="projects__header">
        <h2 className="section__title">
          {title} <span>{accent}</span>
        </h2>

        <div className="projects__nav">
          <button type="button" className="projects__nav-button" onClick={() => scrollBy(-1)}>
            <ArrowUpRight className="icon-prev" aria-hidden="true" />
            <span className="sr-only">{dict.projects.previous}</span>
          </button>
          <button type="button" className="projects__nav-button" onClick={() => scrollBy(1)}>
            <ArrowUpRight className="icon-next" aria-hidden="true" />
            <span className="sr-only">{dict.projects.next}</span>
          </button>
        </div>
      </div>

      <div
        className="projects__swiper"
        ref={trackRef}
        role="region"
        aria-label={dict.projects.carouselLabel}
        tabIndex={0}
      >
        {projects.map((project) => (
          <article key={project.id} className="projects__card">
            <div className="blob" aria-hidden="true" />

            <div className="projects__number">
              <h1>{project.number}</h1>
              <h3>{pick(project.category, lang)}</h3>
            </div>

            <div className="projects__data">
              <h4 className="projects__title">{pick(project.title, lang)}</h4>
              <p className="projects__subtitle">{project.stack}</p>
              <p className="projects__description">{pick(project.description, lang)}</p>
            </div>

            <div className="projects__image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt="" className="projects__img" loading="lazy" />

              <a
                href={project.link}
                className="projects__button"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${dict.projects.viewOnGithub}: ${pick(project.title, lang)}`}
              >
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
