import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Unbounded } from "next/font/google"
import { getDictionary } from "@/lib/i18n"
import { resolveLanguage } from "@/lib/language"
import "./portfolio.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const unbounded = Unbounded({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-unbounded",
})

export function generateMetadata(): Metadata {
  const dict = getDictionary(resolveLanguage())

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: { languages: { en: "/", fr: "/" } },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = resolveLanguage()

  return (
    <html lang={lang} className={`${montserrat.variable} ${unbounded.variable}`}>
      <body>{children}</body>
    </html>
  )
}
