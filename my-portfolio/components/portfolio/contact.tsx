"use client"

import { useState } from "react"
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react"
import { siteConfig, socials } from "@/lib/portfolio-data"
import { getDictionary, type Lang } from "@/lib/i18n"

const linkIcons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const

type Status = "idle" | "sending" | "sent"

export function Contact({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang)
  const [status, setStatus] = useState<Status>("idle")
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const update = (field: keyof typeof form) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("sending")

    try {
      const submissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]")
      submissions.push({
        id: Date.now(),
        ...form,
        to: siteConfig.email,
        timestamp: new Date().toISOString(),
        status: "new",
      })
      localStorage.setItem("contactSubmissions", JSON.stringify(submissions))

      await new Promise((resolve) => setTimeout(resolve, 600))

      setForm({ name: "", email: "", message: "" })
      setStatus("sent")
    } catch {
      setStatus("idle")
    }
  }

  const [title, accent] = dict.contact.title

  return (
    <section id="contact" className="contact container section">
      <h2 className="section__title">
        {title} <span>{accent}</span>
      </h2>

      <div className="contact__container grid">
        <div className="contact__data">
          <p className="contact__description">{dict.contact.description}</p>

          <a href={`mailto:${siteConfig.email}`} className="button contact__button">
            {dict.contact.cta}
            <Send aria-hidden="true" />
          </a>
        </div>

        <div className="contact__content grid">
          <div className="contact__info grid">
            <div className="contact__info-block">
              <h3 className="contact__title">{dict.contact.locationTitle}</h3>
              <p className="contact__address">
                <MapPin aria-hidden="true" /> {siteConfig.location}
              </p>
            </div>

            <div className="contact__info-block">
              <h3 className="contact__title">{dict.contact.phoneTitle}</h3>
              <a href={siteConfig.phoneHref} className="contact__address">
                <Phone aria-hidden="true" /> {siteConfig.phone}
              </a>
            </div>

            <div className="contact__info-block">
              <h3 className="contact__title">{dict.contact.emailTitle}</h3>
              <a href={`mailto:${siteConfig.email}`} className="contact__address">
                <Mail aria-hidden="true" /> {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="contact__write grid">
            <form className="contact__form" onSubmit={onSubmit}>
              <div className="contact__form-row">
                <div className="field">
                  <label className="field__label" htmlFor="contact-name">
                    {dict.contact.labels.name}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    className="field__input"
                    type="text"
                    placeholder={dict.contact.placeholders.name}
                    value={form.name}
                    onChange={update("name")}
                    required
                  />
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="contact-email">
                    {dict.contact.labels.email}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    className="field__input"
                    type="email"
                    placeholder={dict.contact.placeholders.email}
                    value={form.email}
                    onChange={update("email")}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="contact-message">
                  {dict.contact.labels.message}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="field__input"
                  rows={5}
                  placeholder={dict.contact.placeholders.message}
                  value={form.message}
                  onChange={update("message")}
                  required
                />
              </div>

              <button type="submit" className="button" disabled={status === "sending"}>
                {status === "sending" ? dict.contact.sending : dict.contact.submit}
                <Send aria-hidden="true" />
              </button>

              <p aria-live="polite" role="status" aria-label={dict.contact.status}>
                {status === "sent" && dict.contact.success}
              </p>
            </form>
          </div>

          <div className="contact__links">
            {socials.map(({ id, label, href }) => {
              const Icon = linkIcons[id]
              return (
                <a
                  key={id}
                  href={href}
                  className="contact__link"
                  {...(href.startsWith("mailto:")
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {id === "mail" ? siteConfig.email : label}
                  <Icon aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
