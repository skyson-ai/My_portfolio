export const LANGS = ["en", "fr"] as const

export type Lang = (typeof LANGS)[number]

export const DEFAULT_LANG: Lang = "en"

export const LANG_COOKIE = "portfolio-lang"

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value)
}

/** Maps an `Accept-Language` header such as `fr-FR,fr;q=0.9,en;q=0.8` to a supported language. */
export function langFromAcceptLanguage(header: string | null | undefined): Lang {
  if (!header) return DEFAULT_LANG

  const preferences = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";")
      const q = params.find((p) => p.trim().startsWith("q="))
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q.split("=")[1]) || 0 : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of preferences) {
    const base = tag.split("-")[0]
    if (isLang(base)) return base
  }

  return DEFAULT_LANG
}

export type Dictionary = {
  meta: { title: string; description: string }
  langName: Record<Lang, string>
  nav: { ariaLabel: string; toggleLabel: string; items: Record<string, string> }
  home: {
    greeting: string
    roleLines: [string, string, string]
    imageAlt: string
    ctaExplore: string
    ctaTalk: string
    ctaDownload: string
    social: Record<string, string>
  }
  about: {
    title: [string, string]
    description: { text: string; highlights: string[] }
    cta: string
    imageAlt: string
  }
  projects: {
    title: [string, string]
    carouselLabel: string
    previous: string
    next: string
    viewOnGithub: string
  }
  work: {
    title: [string, string]
    tabsLabel: string
    tabs: Record<string, string>
  }
  services: {
    title: [string, string]
    showDetails: string
    hideDetails: string
  }
  achievements: {
    title: [string, string]
    yearLabel: string
  }
  contact: {
    title: [string, string]
    description: string
    cta: string
    locationTitle: string
    phoneTitle: string
    emailTitle: string
    labels: { name: string; email: string; message: string }
    placeholders: { name: string; email: string; message: string }
    submit: string
    sending: string
    success: string
    status: string
  }
  footer: { madeWith: string; by: string; rights: string }
  period: { ongoing: string }
}

const en: Dictionary = {
  meta: {
    title: "Michee Cephas Leyenohin — Odoo & Full-Stack Developer",
    description:
      "Odoo developer and full-stack engineer (Python, Django, FastAPI, Next.js) based in Abidjan, Côte d'Ivoire. Building robust ERP and data solutions.",
  },
  langName: { en: "English", fr: "Français" },
  nav: {
    ariaLabel: "Main navigation",
    toggleLabel: "Switch language",
    items: {
      home: "Home",
      about: "About",
      projects: "Projects",
      work: "Experience",
      services: "Services",
      achievements: "Awards",
      contact: "Contact",
    },
  },
  home: {
    greeting: "Hello, I'm",
    roleLines: ["Full-stack &", "Odoo", "Developer"],
    imageAlt: "Michee Cephas Leyenohin, Odoo and full-stack developer",
    ctaExplore: "Explore Projects",
    ctaTalk: "Let's Talk",
    ctaDownload: "Download CV",
    social: { github: "GitHub profile", linkedin: "LinkedIn profile", mail: "Send an email" },
  },
  about: {
    title: ["About", "Me"],
    description: {
      text: "I develop, customise and integrate Odoo for companies that need their business to actually fit their processes. Across Progistack, CGEDS and Kanaga Consulting I have delivered Odoo modules, third-party integrations and adapted business flows for sales, purchasing, accounting and logistics — and trained the teams who use them. That Odoo work sits on top of a full-stack foundation in Python, Django, FastAPI and Next.js, extended by a Big Data Analytics master's programme.",
      highlights: ["Odoo", "business flows", "Python", "Django", "FastAPI", "Next.js"],
    },
    cta: "Let's Talk",
    imageAlt: "Portrait of Michee Cephas Leyenohin",
  },
  projects: {
    title: ["Featured", "Projects"],
    carouselLabel: "Featured projects carousel",
    previous: "Previous projects",
    next: "Next projects",
    viewOnGithub: "View this project on GitHub",
  },
  work: {
    title: ["My", "Journey"],
    tabsLabel: "Experience filters",
    tabs: { professional: "Experience", education: "Education", skills: "Skills" },
  },
  services: {
    title: ["What I", "Do"],
    showDetails: "Show details",
    hideDetails: "Hide details",
  },
  achievements: {
    title: ["Awards &", "Certifications"],
    yearLabel: "Achievement",
  },
  contact: {
    title: ["Let's", "Connect"],
    description:
      "Available for Odoo customisation, full-stack development and data projects. The fastest way to reach me is by email or phone.",
    cta: "Let's Talk",
    locationTitle: "Where I am",
    phoneTitle: "Call me",
    emailTitle: "Write me",
    labels: { name: "Name", email: "Email", message: "Message" },
    placeholders: {
      name: "Your name",
      email: "you@example.com",
      message: "Tell me about your project",
    },
    submit: "Send Message",
    sending: "Sending…",
    success: "Thanks! Your message was saved — I will get back to you soon.",
    status: "Message status",
  },
  footer: { madeWith: "Made with", by: "by", rights: "All rights reserved" },
  period: { ongoing: "Present" },
}

const fr: Dictionary = {
  meta: {
    title: "Michee Cephas Leyenohin — Développeur Odoo & Full-Stack",
    description:
      "Développeur Odoo et ingénieur full-stack (Python, Django, FastAPI, Next.js) basé à Abidjan, Côte d'Ivoire. Je conçois des solutions ERP et data robustes.",
  },
  langName: { en: "English", fr: "Français" },
  nav: {
    ariaLabel: "Navigation principale",
    toggleLabel: "Changer de langue",
    items: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      work: "Parcours",
      services: "Services",
      achievements: "Distinctions",
      contact: "Contact",
    },
  },
  home: {
    greeting: "Bonjour, je suis",
    roleLines: ["Développeur", "Full-Stack &", "Odoo"],
    imageAlt: "Michee Cephas Leyenohin, développeur Odoo et full-stack",
    ctaExplore: "Voir les projets",
    ctaTalk: "Discutons",
    ctaDownload: "Télécharger le CV",
    social: {
      github: "Profil GitHub",
      linkedin: "Profil LinkedIn",
      mail: "Envoyer un email",
    },
  },
  about: {
    title: ["À propos", "de moi"],
    description: {
      text: "Je développe, personnalise et intègre Odoo pour les entreprises dont les processus doivent réellement correspondre à leur métier. Chez Progistack, CGEDS et Kanaga Consulting, j'ai livré des modules Odoo, des intégrations à des systèmes tiers et l'adaptation des flux métier (ventes, achats, comptabilité, logistique) — et formé les équipes qui les utilisent. Cette expertise Odoo repose sur une base full-stack en Python, Django, FastAPI et Next.js, complétée par un master en Big Data Analytics.",
      highlights: ["Odoo", "flux métier", "Python", "Django", "FastAPI", "Next.js"],
    },
    cta: "Discutons",
    imageAlt: "Portrait de Michee Cephas Leyenohin",
  },
  projects: {
    title: ["Projets", "phares"],
    carouselLabel: "Carrousel des projets phares",
    previous: "Projets précédents",
    next: "Projets suivants",
    viewOnGithub: "Voir ce projet sur GitHub",
  },
  work: {
    title: ["Mon", "parcours"],
    tabsLabel: "Filtres du parcours",
    tabs: {
      professional: "Expériences",
      education: "Formation",
      skills: "Compétences",
    },
  },
  services: {
    title: ["Ce que je", "fais"],
    showDetails: "Voir les détails",
    hideDetails: "Masquer les détails",
  },
  achievements: {
    title: ["Distinctions &", "Certifications"],
    yearLabel: "Distinction",
  },
  contact: {
    title: ["Écrivons", "-moi"],
    description:
      "Disponible pour de la personnalisation Odoo, du développement full-stack et des projets data. Le moyen le plus rapide de me joindre est l'email ou le téléphone.",
    cta: "Discutons",
    locationTitle: "Où me trouver",
    phoneTitle: "Appelez-moi",
    emailTitle: "Écrivez-moi",
    labels: { name: "Nom", email: "Email", message: "Message" },
    placeholders: {
      name: "Votre nom",
      email: "vous@exemple.com",
      message: "Parlez-moi de votre projet",
    },
    submit: "Envoyer le message",
    sending: "Envoi…",
    success: "Merci ! Votre message a été enregistré — je vous répondrai rapidement.",
    status: "Statut du message",
  },
  footer: { madeWith: "Fait avec", by: "par", rights: "Tous droits réservés" },
  period: { ongoing: "Aujourd'hui" },
}

const MONTHS: Record<Lang, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
}

/** `"2024"` or `"2026-05"`. */
export type DateToken = string

export type Period = {
  from: DateToken
  to?: DateToken
  /** Rendered as "Present" / "Aujourd'hui" instead of an end date. */
  ongoing?: boolean
}

function formatDateToken(token: DateToken, lang: Lang): string {
  const [year, month] = token.split("-")
  if (!month) return year

  const name = MONTHS[lang][Number(month) - 1]
  return name ? `${name} ${year}` : `${month}/${year}`
}

/** Formats a period in the active language, e.g. "May 2026 — Present" / "mai 2026 — Aujourd'hui". */
export function formatPeriod(period: Period, lang: Lang): string {
  const from = formatDateToken(period.from, lang)
  const to = period.ongoing
    ? dictionaries[lang].period.ongoing
    : period.to
      ? formatDateToken(period.to, lang)
      : dictionaries[lang].period.ongoing

  return `${from} — ${to}`
}

export const dictionaries: Record<Lang, Dictionary> = { en, fr }

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang] ?? dictionaries[DEFAULT_LANG]
}

/** Picks the right side of a `{ en, fr }` record. */
export function pick<T>(value: Record<Lang, T>, lang: Lang): T {
  return value[lang] ?? value[DEFAULT_LANG]
}
