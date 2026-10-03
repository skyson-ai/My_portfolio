import { Download, Github, Linkedin, Mail } from "lucide-react"
import { siteConfig, socials } from "@/lib/portfolio-data"
import { getDictionary, type Lang } from "@/lib/i18n"

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const

export function Home({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang)
  const [first, second, third] = dict.home.roleLines

  return (
    <section id="home" className="home section section-top">
      <div className="home__container container grid">
        <div className="home__image">
          <div className="blob-animate" aria-hidden="true" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.photo}
            alt={dict.home.imageAlt}
            className="home__profile"
            width={1050}
            height={1400}
          />

          <div className="home__shadow" aria-hidden="true" />
        </div>

        <div className="home__data">
          <p className="home__greeting">{dict.home.greeting}</p>
          <h1 className="home__name">{siteConfig.name}</h1>
          <div className="home__info">
            <p className="home__split">{first}</p>
            <p className="home__profession-1">{second}</p>
            <p className="home__profession-2">{third}</p>
          </div>

          <div className="home__actions">
            <a href="#projects" className="button">
              {dict.home.ctaExplore}
            </a>
            <a href="#contact" className="button">
              {dict.home.ctaTalk}
            </a>
            <a
              href={siteConfig.cvPath}
              className="button button--ghost"
              download={siteConfig.cvFileName}
            >
              <Download aria-hidden="true" />
              {dict.home.ctaDownload}
            </a>
          </div>
        </div>

        <div className="home__social">
          {socials.map(({ id, label, href }) => {
            const Icon = socialIcons[id]
            return (
              <a
                key={id}
                href={href}
                className="home__social-link"
                aria-label={dict.home.social[id] ?? label}
                {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              >
                <Icon aria-hidden="true" />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
