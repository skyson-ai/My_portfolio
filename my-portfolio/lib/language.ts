import { cookies, headers } from "next/headers"
import { DEFAULT_LANG, LANG_COOKIE, isLang, langFromAcceptLanguage, type Lang } from "./i18n"

/**
 * Resolves the visitor language server-side, in order of priority:
 * 1. the `portfolio-lang` cookie written by the language toggle,
 * 2. the `Accept-Language` request header,
 * 3. English.
 */
export function resolveLanguage(): Lang {
  const stored = cookies().get(LANG_COOKIE)?.value
  if (isLang(stored)) return stored

  const fromHeader = langFromAcceptLanguage(headers().get("accept-language"))
  return fromHeader ?? DEFAULT_LANG
}
