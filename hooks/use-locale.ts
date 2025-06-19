"use client"

import { useState, useEffect } from "react"
import type { Locale } from "@/lib/i18n"

const LOCALE_STORAGE_KEY = "currency-app-locale"

export function useLocale() {
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    // Load from localStorage or detect browser language
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale
    if (stored) {
      setLocale(stored)
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0] as Locale
      const supportedLocales: Locale[] = ["en", "es", "fr", "de", "ja", "zh"]
      if (supportedLocales.includes(browserLang)) {
        setLocale(browserLang)
      }
    }
  }, [])

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
  }

  return { locale, changeLocale }
}
