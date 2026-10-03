"use client"

import { useState } from "react"
import { BriefcaseBusiness, Code, GraduationCap } from "lucide-react"
import { workContent, workTabs } from "@/lib/portfolio-data"
import { formatPeriod, getDictionary, pick, type Lang } from "@/lib/i18n"

const icons = {
  graduation: GraduationCap,
  briefcase: BriefcaseBusiness,
  code: Code,
} as const

export function Work({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang)
  const [activeTab, setActiveTab] = useState<string>(workTabs[0].id)
  const [title, accent] = dict.work.title

  return (
    <section id="work" className="work container section">
      <h2 className="section__title">
        {title} <span>{accent}</span>
      </h2>

      <div className="work__container grid">
        <div className="work__tabs" role="tablist" aria-label={dict.work.tabsLabel}>
          {workTabs.map(({ id, label, icon: iconName }) => {
            const Icon = icons[iconName]
            const isActive = activeTab === id

            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={isActive}
                aria-controls={`panel-${id}`}
                className={`work__button ${isActive ? "work-active" : ""}`}
                onClick={() => setActiveTab(id)}
              >
                <Icon aria-hidden="true" />
                {pick(label, lang)}
              </button>
            )
          })}
        </div>

        <div className="work__area">
          <div className="work__line" aria-hidden="true" />

          {workTabs.map(({ id }) => (
            <div
              key={id}
              role="tabpanel"
              id={`panel-${id}`}
              aria-labelledby={`tab-${id}`}
              data-content={id}
              className={activeTab === id ? "work-active" : undefined}
            >
              <div className="work__content">
                {workContent[id].map((entry) => (
                  <article key={`${entry.subtitle.en}-${entry.period.from}`} className="work__card">
                    <div className="work__data">
                      <div className="work__role">
                        <h3 className="work__title">{pick(entry.title, lang)}</h3>
                        <p className="work__subtitle">{pick(entry.subtitle, lang)}</p>
                      </div>
                      <span className="work__year">{formatPeriod(entry.period, lang)}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
