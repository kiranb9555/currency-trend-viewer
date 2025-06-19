"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAvailableLocales, type Locale } from "@/lib/i18n"

interface LanguageSelectorProps {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function LanguageSelector({ locale, onLocaleChange }: LanguageSelectorProps) {
  const locales = getAvailableLocales()

  return (
    <Select value={locale} onValueChange={(value) => onLocaleChange(value as Locale)}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((loc) => (
          <SelectItem key={loc.code} value={loc.code}>
            <span className="flex items-center gap-2">
              <span>{loc.flag}</span>
              <span>{loc.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
