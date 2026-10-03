import { siteConfig } from "@/lib/portfolio-data"
import { getDictionary, type Lang } from "@/lib/i18n"

export function Footer({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang)
  const year = new Date().getFullYear()

  return (
    <footer className="footer container grid">
      <div className="blob-animate" aria-hidden="true" />

      <p className="footer__copy">
        {dict.footer.madeWith} <span>&#9829;</span> {dict.footer.by} {siteConfig.author}
      </p>

      <p className="footer__year">
        &copy; {year} {dict.footer.rights}
      </p>
    </footer>
  )
}
