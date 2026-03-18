import type { Page } from '@/payload-types'
import { getServerSideURL } from './getURL'
import { BLOG_CONFIG } from '@/core/config/blog'
import { Locale } from '@/core/types'
import { routing } from '@/i18n/routing'
import { I18N_CONFIG } from '@/core/config/i18n'

export function getPathFromBreadcrumbs(breadcrumbs?: Page['breadcrumbs']): string | undefined {
  if (!Array.isArray(breadcrumbs) || breadcrumbs.length === 0) {
    return undefined
  }

  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1]
  if (!lastBreadcrumb?.url) {
    return undefined
  }

  return lastBreadcrumb.url.replace(/^\//, '')
}

type BuildUrlOptions = (
  | {
      collection: 'page'
      breadcrumbs?: Page['breadcrumbs']
      page?: never
    }
  | {
      collection: 'posts'
      breadcrumbs?: never
      page?: number
    }
) & {
  absolute?: boolean
  slug?: string | null
  locale: string
}

export function buildUrl({
  collection,
  breadcrumbs,
  absolute = true,
  page,
  slug,
  locale,
}: BuildUrlOptions): string {
  const baseUrl = getServerSideURL()
  let relativePath: string = ''
  const currentLocale = locale || (routing.defaultLocale as Locale)
  const includePrefix = I18N_CONFIG.localePrefix !== 'never'
  const localePrefix = includePrefix ? `/${currentLocale}` : ''

  if (collection === 'posts') {
    if (page !== undefined && page > 1) {
      const url = new URL(BLOG_CONFIG.basePath, baseUrl)
      url.searchParams.set('page', String(page))
      relativePath = url.pathname + url.search
    } else if (slug) {
      relativePath = `${BLOG_CONFIG.basePath}/${slug}`
    } else {
      relativePath = BLOG_CONFIG.basePath
    }
  } else if (collection === 'page') {
    const pathFromBreadcrumbs = breadcrumbs ? getPathFromBreadcrumbs(breadcrumbs) : undefined

    const finalSlug = slug ?? pathFromBreadcrumbs

    if (!finalSlug || finalSlug === 'home') {
      relativePath = ''
    } else {
      relativePath = `/${finalSlug}`
    }
  }

  const fullPath = `${localePrefix}${relativePath}`

  if (!absolute) return fullPath

  return `${baseUrl}${fullPath}`
}
