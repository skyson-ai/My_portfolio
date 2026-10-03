import type { Lang, Period } from "./i18n"

type Localized = Record<Lang, string>

export const LOCALIZED: Lang[] = ["en", "fr"]

const loc = (en: string, fr: string): Localized => ({ en, fr })

export const siteConfig = {
  name: "MICHEE CEPHAS",
  fullName: "MICHEE CEPHAS LEYENOHIN",
  logo: "MICHEE CEPHAS",
  author: "Michee Cephas",
  email: "micheecephasl@gmail.com",
  phone: "+225 01 03 66 97 63",
  phoneHref: "tel:+2250103669763",
  location: "Abidjan, Bingerville — Côte d'Ivoire",
  country: "Côte d'Ivoire",
  github: "https://github.com/skyson-ai",
  linkedin: "https://www.linkedin.com/in/skyson-ai",
  cvPath: "/CV_LEYENOHIN_MICHEE_CEPHAS..pdf",
  cvFileName: "CV_LEYENOHIN_MICHEE_CEPHAS.pdf",
  photo: "/michee-cephas.jpg",
} as const

export const navLinks = [
  { id: "home", label: loc("Home", "Accueil") },
  { id: "about", label: loc("About", "À propos") },
  { id: "projects", label: loc("Projects", "Projets") },
  { id: "work", label: loc("Experience", "Parcours") },
  { id: "services", label: loc("Services", "Services") },
  { id: "achievements", label: loc("Awards", "Distinctions") },
  { id: "contact", label: loc("Contact", "Contact") },
] as const

export const socials = [
  { id: "github", label: "GitHub", href: siteConfig.github },
  { id: "linkedin", label: "LinkedIn", href: siteConfig.linkedin },
  { id: "mail", label: "Email", href: `mailto:${siteConfig.email}` },
] as const

export const aboutDescription = {
  /** Plain copy, with `highlights` bolded wherever they appear. */
  text: {
    en: "I develop, customise and integrate Odoo for companies that need their business to actually fit their processes. Across Progistack, CGEDS and Kanaga Consulting I have delivered Odoo modules, third-party integrations and adapted business flows for sales, purchasing, accounting and logistics — and trained the teams who use them. That Odoo work sits on top of a full-stack foundation in Python, Django, FastAPI and Next.js, extended by a Big Data Analytics master's programme.",
    fr: "Je développe, personnalise et intègre Odoo pour les entreprises dont les processus doivent réellement correspondre à leur métier. Chez Progistack, CGEDS et Kanaga Consulting, j'ai livré des modules Odoo, des intégrations à des systèmes tiers et l'adaptation des flux métier (ventes, achats, comptabilité, logistique) — et formé les équipes qui les utilisent. Cette expertise Odoo repose sur une base full-stack en Python, Django, FastAPI et Next.js, complétée par un master en Big Data Analytics.",
  },
  highlights: ["Odoo", "Python", "Django", "FastAPI", "Next.js"],
} as const

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  id: string
  number: string
  category: Localized
  title: Localized
  /** Technology stack — language neutral. */
  stack: string
  description: Localized
  image: string
  link: string
  linkLabel: Localized
}

export const projects: Project[] = [
  {
    id: "ma-piss",
    number: "01",
    category: loc("Real Estate", "Immobilier"),
    title: loc("MA PISS", "MA PISS"),
    stack: "Next.js · FastAPI · PostgreSQL",
    description: {
      en: "A platform connecting landlords and tenants to make housing searches simple and cut the cost of living. Intuitive search, listing management and an integrated contact system.",
      fr: "Une plateforme reliant propriétaires et locataires pour faciliter la recherche de logements et réduire le coût de la vie. Recherche intuitive, gestion des annonces et système de contact intégré.",
    },
    image: "/placeholder.svg",
    link: "https://github.com/skyson-ai",
    linkLabel: loc("View on GitHub", "Voir sur GitHub"),
  },
  {
    id: "jeunes-blogueurs",
    number: "02",
    category: loc("Editorial", "Éditorial"),
    title: loc("Blog Jeunes Blogueurs CI", "Blog Jeunes Blogueurs CI"),
    stack: "Next.js · FastAPI · PostgreSQL",
    description: {
      en: "A blog platform built for a client, serving the Ivorian young-blogger community. Articles, authors and categories behind a modern Next.js interface.",
      fr: "Une plateforme de blog développée pour un client, destinée à la communauté des young bloggers ivoiriens. Articles, auteurs et catégories derrière une interface Next.js moderne.",
    },
    image: "/placeholder.svg",
    link: "https://github.com/skyson-ai",
    linkLabel: loc("View on GitHub", "Voir sur GitHub"),
  },
  {
    id: "elearning-immobilier",
    number: "03",
    category: loc("E-learning", "E-learning"),
    title: loc("Real-estate Training Platform", "Plateforme e-learning immobilier"),
    stack: "Next.js · Node.js",
    description: {
      en: "A complete real-estate e-learning platform delivered end to end, from architecture to production. Frontend built on Next.js, backend on Node.js, with content and user management.",
      fr: "Une plateforme e-learning immobilier complète livrée de bout en bout, de l'architecture à la mise en production. Frontend Next.js, backend Node.js, gestion des contenus et des utilisateurs.",
    },
    image: "/placeholder.svg",
    link: "https://github.com/skyson-ai",
    linkLabel: loc("Client project", "Projet client"),
  },
  {
    id: "ecommerce-chatbot",
    number: "04",
    category: loc("E-commerce · NLP", "E-commerce · NLP"),
    title: loc("Store with an AI Assistant", "Boutique avec assistant IA"),
    stack: "Next.js · FastAPI · NLP",
    description: {
      en: "An e-commerce platform with an intelligent chatbot handling customer assistance. NLP intent detection and responses, behind a Next.js storefront.",
      fr: "Une plateforme e-commerce avec un chatbot intelligent pour l'assistance clientèle. Détection d'intentions et réponses en NLP, derrière une interface Next.js.",
    },
    image: "/placeholder.svg",
    link: "https://github.com/skyson-ai",
    linkLabel: loc("Client project", "Projet client"),
  },
]

/* ------------------------------------------------------------------ */
/* Experience / education / skills                                     */
/* ------------------------------------------------------------------ */

export type WorkEntry = {
  title: Localized
  /** Company or school. */
  subtitle: Localized
  /** Date range, rendered as a badge so it never competes with the role title. */
  period: Period
}

export const workTabs = [
  { id: "professional", label: loc("Experience", "Expériences"), icon: "briefcase" },
  { id: "education", label: loc("Education", "Formation"), icon: "graduation" },
  { id: "skills", label: loc("Skills", "Compétences"), icon: "code" },
] as const

export const workContent: Record<string, WorkEntry[]> = {
  professional: [
    {
      title: loc("Odoo Developer", "Développeur Odoo"),
      subtitle: loc("Kanaga Consulting", "Kanaga Consulting"),
      period: { from: "2026-05", ongoing: true },
    },
    {
      title: loc(
        "Technical & Functional Odoo Consultant",
        "Consultant Odoo technique & fonctionnel",
      ),
      subtitle: loc("CGEDS", "CGEDS"),
      period: { from: "2026-06", to: "2026-08" },
    },
    {
      title: loc("Odoo Developer", "Développeur Odoo"),
      subtitle: loc("Progistack", "Progistack"),
      period: { from: "2025-01", to: "2026-05" },
    },
    {
      title: loc("Telecommunications Technician", "Technicien Télécommunications"),
      subtitle: loc("EDAHTECH", "EDAHTECH"),
      period: { from: "2024-10", to: "2024-12" },
    },
    {
      title: loc("Web Developer", "Développeur Web"),
      subtitle: loc("Uriel Group", "Uriel Group"),
      period: { from: "2024-07", to: "2024-10" },
    },
    {
      title: loc("Full-Stack Developer", "Développeur Full-Stack"),
      subtitle: loc("Growing Consulting Group", "Growing Consulting Group"),
      period: { from: "2024-04", to: "2024-09" },
    },
    {
      title: loc("Web Developer Intern", "Stagiaire Développeur Web"),
      subtitle: loc("Uriel Group", "Uriel Group"),
      period: { from: "2024-03", to: "2024-06" },
    },
  ],
  education: [
    {
      title: loc("Master 1 — Big Data Analytics", "Master 1 — Big Data Analytics"),
      subtitle: loc(
        "Université Virtuelle de Côte d'Ivoire (UVCI)",
        "Université Virtuelle de Côte d'Ivoire (UVCI)",
      ),
      period: { from: "2025-10", ongoing: true },
    },
    {
      title: loc(
        "Licence — Systems Engineering & Software",
        "Licence — Systèmes Informatiques & Génie Logiciel",
      ),
      subtitle: loc("ESATIC — Mention Bien", "ESATIC — Mention Bien"),
      period: { from: "2021-09", to: "2024-09" },
    },
    {
      title: loc("Baccalauréat — Série C", "Baccalauréat — Série C"),
      subtitle: loc(
        "Lycée Moderne Leboutou, Dabou — Assez Bien",
        "Lycée Moderne Leboutou, Dabou — Assez Bien",
      ),
      period: { from: "2020", to: "2021" },
    },
  ],
  skills: [
    {
      title: loc("Odoo & Business Flows", "Odoo & Flux métier"),
      subtitle: {
        en: "Modules, customisation, integration, training",
        fr: "Modules, personnalisation, intégration, formation",
      },
      period: { from: "2024", ongoing: true },
    },
    {
      title: loc("Backend & Data", "Backend & Data"),
      subtitle: {
        en: "Python, Django, FastAPI, PostgreSQL, Pandas",
        fr: "Python, Django, FastAPI, PostgreSQL, Pandas",
      },
      period: { from: "2024", ongoing: true },
    },
    {
      title: loc("Frontend & Infrastructure", "Frontend & Infrastructure"),
      subtitle: {
        en: "Next.js, Node.js, Docker, Kubernetes, AWS",
        fr: "Next.js, Node.js, Docker, Kubernetes, AWS",
      },
      period: { from: "2024", ongoing: true },
    },
  ],
}

/* ------------------------------------------------------------------ */
/* Awards & certifications                                             */
/* ------------------------------------------------------------------ */

export type Achievement = {
  id: string
  kind: "award" | "certificate"
  title: Localized
  detail: Localized
  meta: string
}

export const achievements: Achievement[] = [
  {
    id: "data-tour",
    kind: "award",
    title: loc("Data Tour 2025 — Crédit Scoring", "Data Tour 2025 — Crédit Scoring"),
    detail: loc(
      "5th place nationally on a 17.6-million-row credit-scoring dataset.",
      "5e place nationale sur un jeu de données de 17,6 millions d'entrées.",
    ),
    meta: "2025",
  },
  {
    id: "zindi",
    kind: "award",
    title: loc("Zindi Challenges", "Challenges Zindi"),
    detail: loc(
      "Regular participation in Data Science and Machine Learning competitions.",
      "Participation régulière à des challenges de Data Science et Machine Learning.",
    ),
    meta: "Ongoing",
  },
  {
    id: "cert-python",
    kind: "certificate",
    title: loc("Python", "Python"),
    detail: loc("Certification — Udemy", "Certification — Udemy"),
    meta: "Udemy",
  },
  {
    id: "cert-django",
    kind: "certificate",
    title: loc("Django", "Django"),
    detail: loc("Certification — Udemy", "Certification — Udemy"),
    meta: "Udemy",
  },
  {
    id: "cert-ds",
    kind: "certificate",
    title: loc("Data Science & Machine Learning", "Data Science & Machine Learning"),
    detail: loc(
      "Learning data science and machine learning with Python — Udemy",
      "Apprendre la Data Science et le Machine Learning avec Python — Udemy",
    ),
    meta: "Udemy",
  },
]

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  id: string
  title: Localized
  subtitle: Localized
  skills: string[]
  details: Localized
}

export const services: Service[] = [
  {
    id: "odoo",
    title: loc("Odoo Development", "Développement Odoo"),
    subtitle: {
      en: "An ERP that fits the way your company actually works.",
      fr: "Un ERP qui colle à la façon dont votre entreprise travaille.",
    },
    skills: ["Odoo", "Python", "PostgreSQL", "XML", "Business flows"],
    details: {
      en: "Module development and customisation, custom views and reports, and adaptation of sales, purchasing, accounting and logistics flows. I integrate Odoo with third-party systems, keep the technical architecture maintainable, and train the users who will live in the tool every day.",
      fr: "Développement et personnalisation de modules, vues et rapports sur mesure, adaptation des flux ventes, achats, comptabilité et logistique. J'intègre Odoo à des systèmes tiers, je maintiens une architecture technique lisible, et je forme les utilisateurs qui vivront dans l'outil au quotidien.",
    },
  },
  {
    id: "fullstack",
    title: loc("Full-Stack Development", "Développement Full-Stack"),
    subtitle: {
      en: "Web products built end to end, from architecture to deployment.",
      fr: "Des produits web construits de bout en bout, de l'architecture au déploiement.",
    },
    skills: ["Next.js", "Node.js", "Python", "FastAPI", "PostgreSQL"],
    details: {
      en: "Next.js frontends and Python or Node.js backends, designed together rather than handed over. Clear API contracts, sensible data models, and code that another developer can pick up without a rewrite.",
      fr: "Fronts Next.js et backends Python ou Node.js, pensés ensemble plutôt que plaqués l'un contre l'autre. Contrats d'API clairs, modèles de données raisonnables, et un code qu'un autre développeur peut reprendre sans tout réécrire.",
    },
  },
  {
    id: "data",
    title: loc("Data & Machine Learning", "Data & Machine Learning"),
    subtitle: {
      en: "From raw data to a model you can actually ship.",
      fr: "De la donnée brute à un modèle que vous pouvez vraiment deployer.",
    },
    skills: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
    details: {
      en: "Exploratory analysis, feature engineering and classical models, evaluated properly. My Big Data Analytics master's work includes a national credit-scoring challenge on a 17.6-million-row dataset, where I placed 5th.",
      fr: "Analyse exploratoire, ingénierie de variables et modèles classiques, correctement évalués. Mon master en Big Data Analytics inclut un challenge national de crédit scoring sur 17,6 millions d'entrées, où j'ai obtenu la 5e place.",
    },
  },
  {
    id: "infra",
    title: loc("Infrastructure & Delivery", "Infrastructure & Livraison"),
    subtitle: {
      en: "Ship it, watch it, keep it running.",
      fr: "Livrez, surveillez, faites tourner.",
    },
    skills: ["Docker", "Kubernetes", "AWS Cloud", "Jenkins", "Git"],
    details: {
      en: "Containerised builds, orchestration on Kubernetes, hosting on AWS, and pipelines on Jenkins that build, test and deploy. Code review and maintenance of existing architectures, because most ERP pain comes from what was shipped years ago.",
      fr: "Builds conteneurisés, orchestration sur Kubernetes, hébergement AWS, et pipelines Jenkins qui construisent, testent et déploient. Revue de code et maintenance d'architectures existantes, car la plupart des douleurs ERP viennent de ce qui a été livré il y a des années.",
    },
  },
]

export const languages = [
  { id: "fr", label: loc("French — Advanced", "Français — Avancé") },
  { id: "en", label: loc("English — Advanced", "Anglais — Avancé") },
] as const
