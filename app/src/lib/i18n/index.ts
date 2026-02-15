import { AppLocale, ITranslations } from './locales'
import { en } from './en'
import { es } from './es'

const localeKey = 'selectedLocale'

const translations: Record<AppLocale, ITranslations> = {
  en,
  es,
}

let currentLocale: AppLocale = loadLocale()

function loadLocale(): AppLocale {
  const stored = localStorage.getItem(localeKey)
  if (stored === 'en' || stored === 'es') {
    return stored
  }
  return 'en'
}

export function t<K extends keyof ITranslations>(key: K): ITranslations[K] {
  return translations[currentLocale][key]
}

export function getLocale(): AppLocale {
  return currentLocale
}

export function setLocale(locale: AppLocale): void {
  currentLocale = locale
  localStorage.setItem(localeKey, locale)
}

export { AppLocale, ITranslations }
