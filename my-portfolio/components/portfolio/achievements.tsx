import { Trophy, BadgeCheck } from "lucide-react"
import { achievements } from "@/lib/portfolio-data"
import { getDictionary, pick, type Lang } from "@/lib/i18n"

type Achievement = (typeof achievements)[number]

const icons = {
  award: Trophy,
  certificate: BadgeCheck,
} as const

function Card({ achievement, lang }: { achievement: Achievement; lang: Lang }) {
  const dict = getDictionary(lang)
  const Icon = icons[achievement.kind]

  return (
    <article className="achievements__card">
      <div className="blob" aria-hidden="true" />

      <div className="achievements__data">
        <div className="achievements__badge">
          <Icon aria-hidden="true" />
          <span className="achievements__meta">{achievement.meta}</span>
        </div>

        <div className="achievements__body">
          <h3 className="achievements__title">{pick(achievement.title, lang)}</h3>
          <p className="achievements__detail">{pick(achievement.detail, lang)}</p>
        </div>
      </div>

      <span className="sr-only">{dict.achievements.yearLabel}</span>
    </article>
  )
}

function Marquee({ lang, reverse = false }: { lang: Lang; reverse?: boolean }) {
  // The row is duplicated so the -50% keyframe loops seamlessly.
  const row = [...achievements, ...achievements]

  return (
    <div className={`achievements__content ${reverse ? "achievements__reverse" : ""}`}>
      {row.map((achievement, index) => (
        <Card key={`${achievement.id}-${index}`} achievement={achievement} lang={lang} />
      ))}
    </div>
  )
}

export function Achievements({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang)
  const [title, accent] = dict.achievements.title

  return (
    <section id="achievements" className="achievements container section">
      <h2 className="section__title">
        {title} <span>{accent}</span>
      </h2>

      <div className="achievements__container grid">
        <Marquee lang={lang} />
        <Marquee lang={lang} reverse />
      </div>
    </section>
  )
}
