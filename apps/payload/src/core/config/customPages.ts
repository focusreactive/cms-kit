import { BLOG_CONFIG } from '@/core/config/blog'
import { shouldIncludeLocalePrefix } from '@/core/lib/localePrefix'

export type CustomPageKey = 'blog'

export interface CustomPageEntry {
  label: {
    en: string
    es: string
  }
  resolver: (locale: string) => string
}

export const CUSTOM_PAGES_CONFIG: Record<CustomPageKey, CustomPageEntry> = {
  blog: {
    label: {
      en: 'Blog',
      es: 'Blog',
    },
    resolver: (locale) =>
      shouldIncludeLocalePrefix(locale)
        ? `/${locale}${BLOG_CONFIG.basePath}`
        : BLOG_CONFIG.basePath,
  },
}
