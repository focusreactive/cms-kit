import { getLocale } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { Locale } from '@/core/types'

export async function resolveLocale(locale?: Locale): Promise<Locale> {
  if (locale) {
    return hasLocale(routing.locales, locale) ? locale : (routing.defaultLocale as Locale)
  }

  try {
    const resolved = await getLocale()
    return hasLocale(routing.locales, resolved)
      ? (resolved as Locale)
      : (routing.defaultLocale as Locale)
  } catch {
    return routing.defaultLocale as Locale
  }
}
