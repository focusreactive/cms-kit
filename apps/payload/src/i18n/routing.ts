import { defineRouting } from 'next-intl/routing'
import { localization } from './localization'
import { I18N_CONFIG } from '@/shared/config/i18n'

export const routing = defineRouting({
  locales: localization.locales as string[],
  defaultLocale: localization.defaultLocale,
  localePrefix: I18N_CONFIG.localePrefix,
})
