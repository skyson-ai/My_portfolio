"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { services } from "@/lib/portfolio-data"
import { getDictionary, pick, type Lang } from "@/lib/i18n"

export function Services({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang)
  const [openId, setOpenId] = useState<string | null>(null)
  const [title, accent] = dict.services.title

  const toggle = (id: string) => setOpenId((current) => (current === id ? null : id))

  return (
    <section id="services" className="services container section">
      <h2 className="section__title">
        {title} <span>{accent}</span>
      </h2>

      <div className="services__container grid">
        {services.map((service) => {
          const isOpen = openId === service.id
          const panelId = `service-info-${service.id}`
          const name = pick(service.title, lang)

          return (
            <article
              key={service.id}
              className={`services__card ${isOpen ? "services__open" : "services__close"}`}
            >
              <div className="blob" aria-hidden="true" />
              <div className="blob blob-2" aria-hidden="true" />

              <div className="services__data">
                <h3 className="services__title">{name}</h3>
                <p className="services__subtitle">{pick(service.subtitle, lang)}</p>

                <ul className="services__skills">
                  {service.skills.map((skill) => (
                    <li key={skill} className="services__skill">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div id={panelId} className="services__info" aria-hidden={!isOpen}>
                <p>{pick(service.details, lang)}</p>
              </div>

              <button
                type="button"
                className="services__button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(service.id)}
              >
                <Plus aria-hidden="true" />
                <span className="sr-only">
                  {isOpen ? `${dict.services.hideDetails}: ${name}` : `${dict.services.showDetails}: ${name}`}
                </span>
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
