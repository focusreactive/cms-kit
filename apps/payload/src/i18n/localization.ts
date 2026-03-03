import { I18N_CONFIG } from '@/shared/config/i18n'
import { LocalizationConfig } from 'payload'

export const localization: LocalizationConfig = {
  locales: I18N_CONFIG.locales.map((locale) => locale.code),
  defaultLocale: I18N_CONFIG.defaultLocale,
  fallback: true,
}
