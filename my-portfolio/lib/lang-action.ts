"use server"

import { cookies } from "next/headers"
import { LANG_COOKIE, isLang, type Lang } from "./i18n"

const ONE_YEAR = 60 * 60 * 24 * 365

/** Persists the visitor's language choice so the server can render it on the next request. */
export async function setLanguage(lang: Lang) {
  if (!isLang(lang)) return

  cookies().set(LANG_COOKIE, lang, {
    path: "/",
    maxAge: ONE_YEAR,
    sameSite: "lax",
  })
}
