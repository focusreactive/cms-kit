import { LocalePrefix, LocalePrefixMode } from 'next-intl/routing'
import { Locale } from '../types'

export const I18N_CONFIG: {
  locales: { code: Locale; label: string }[]
  defaultLocale: string
  openGraphLocales: Record<string, string>
  localePrefix: LocalePrefix<Locale[], LocalePrefixMode>
} = {
  locales: [
    {
      code: 'en',
      label: 'English',
    },
    {
      code: 'es',
      label: 'Spanish',
    },
  ],
  defaultLocale: 'en',
  openGraphLocales: {
    en: 'en_US',
    es: 'es_ES',
  },
  localePrefix: 'as-needed',
}
