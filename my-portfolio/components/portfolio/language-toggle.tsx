"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { setLanguage } from "@/lib/lang-action"
import { LANGS, getDictionary, type Lang } from "@/lib/i18n"

export function LanguageToggle({ lang }: { lang: Lang }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const dict = getDictionary(lang)

  const nextLang: Lang = LANGS.find((code) => code !== lang) ?? "en"

  const toggle = () => {
    startTransition(async () => {
      await setLanguage(nextLang)
      router.refresh()
    })
  }

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggle}
      disabled={pending}
      aria-label={`${dict.nav.toggleLabel} — ${dict.langName[lang]}`}
      title={`${dict.nav.toggleLabel} — ${dict.langName[lang]}`}
    >
      <span className="lang-toggle__option" data-active={lang === "en"}>
        EN
      </span>
      <span aria-hidden="true" className="lang-toggle__sep">
        /
      </span>
      <span className="lang-toggle__option" data-active={lang === "fr"}>
        FR
      </span>
    </button>
  )
}
