import { I18N_CONFIG } from '@/core/config/i18n'

export function shouldIncludeLocalePrefix(locale: string) {
  const isDefaultLocale = locale === I18N_CONFIG.defaultLocale

  return (
    I18N_CONFIG.localePrefix === 'always' ||
    (I18N_CONFIG.localePrefix === 'as-needed' && !isDefaultLocale)
  )
}
