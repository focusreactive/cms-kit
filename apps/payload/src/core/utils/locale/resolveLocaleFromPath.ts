import { I18N_CONFIG } from '@/core/config/i18n'

interface Props {
  locale: string | null
  path: string
}

const localeCodes = I18N_CONFIG.locales.map((l) => l.code) as string[]

export function resolveLocaleFromPath({ locale, path }: Props) {
  if (locale && localeCodes.includes(locale)) return locale

  const firstSegment = path.split('/').filter(Boolean)[0]
  if (firstSegment && localeCodes.includes(firstSegment)) return firstSegment

  return I18N_CONFIG.defaultLocale
}
