import { aboutDescription, siteConfig } from "@/lib/portfolio-data"
import { emphasize } from "@/lib/emphasize"
import { getDictionary, type Lang } from "@/lib/i18n"

export function About({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang)
  const [title, accent] = dict.about.title

  return (
    <section id="about" className="about container section">
      <div className="about__container grid">
        <div className="about__data">
          <h2 className="section__title">
            {title} <span>{accent}</span>
          </h2>

          <p className="about__description">
            {emphasize(aboutDescription.text[lang], aboutDescription.highlights)}
          </p>

          <a href="#contact" className="button">
            {dict.about.cta}
          </a>
        </div>

        <div className="about__image">
          <div className="blob-animate" aria-hidden="true" />
          <div className="blob-animate" aria-hidden="true" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.photo}
            alt={dict.about.imageAlt}
            className="about__profile"
            width={1050}
            height={1400}
          />

          <div className="about__shadow" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
