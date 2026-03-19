import type { PayloadRequest } from 'payload'
import { I18N_CONFIG } from '@/core/config/i18n'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import type { Locale } from '@/core/types'

export function getLocaleFromRequest(req: PayloadRequest): Locale {
  const searchLocale = req.searchParams?.get('locale')
  if (searchLocale && hasLocale(routing.locales, searchLocale)) {
    return searchLocale as Locale
  }

  return I18N_CONFIG.defaultLocale as Locale
}
