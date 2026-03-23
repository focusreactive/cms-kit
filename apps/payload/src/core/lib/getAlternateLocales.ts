import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { I18N_CONFIG } from '@/core/config/i18n'
import { buildUrl } from '../utils/path/buildUrl'
import { Locale } from '../types'
import type { Page } from '@/payload-types'
import { BLOG_CONFIG } from '@/core/config/blog'

type GetAlternateLocalesOptions =
  | {
      collection: 'page'
      breadcrumbs?: Page['breadcrumbs']
      slug?: string
      currentLocale: Locale
    }
  | {
      collection: 'posts'
      slug?: string
      currentLocale: Locale
      page?: number
    }

export async function getAlternateLocales(
  options: GetAlternateLocalesOptions,
): Promise<Record<string, string>> {
  const payload = await getPayload({ config: configPromise })
  const locales = I18N_CONFIG.locales.map((l) => l.code as Locale)
  const languages: Partial<Record<Locale | 'x-default', string>> = {}

  if (options.collection === 'posts') {
    if (options.page !== undefined && !options.slug) {
      for (const locale of locales) {
        const url = buildUrl({
          collection: 'posts',
          page: options.page > 1 ? options.page : undefined,
          locale,
        })
        languages[locale] = url
      }
      languages['x-default'] = buildUrl({
        collection: 'posts',
        page: options.page > 1 ? options.page : undefined,
        locale: I18N_CONFIG.defaultLocale as Locale,
      })
      return languages
    }

    if (options.slug) {
      for (const locale of locales) {
        const result = await payload.find({
          collection: BLOG_CONFIG.collection,
          limit: 1,
          pagination: false,
          overrideAccess: false,
          locale,
          where: {
            slug: {
              equals: options.slug,
            },
            _status: {
              equals: 'published',
            },
          },
          select: {
            slug: true,
          },
        })

        if (result.docs.length > 0) {
          const url = buildUrl({
            collection: 'posts',
            slug: options.slug,
            locale,
          })
          languages[locale] = url
        }
      }

      if (languages[I18N_CONFIG.defaultLocale as Locale]) {
        languages['x-default'] = languages[I18N_CONFIG.defaultLocale as Locale]
      }
    }

    return languages
  }

  if (options.collection === 'page') {
    let pathSegments: string[] = []

    if (options.breadcrumbs && options.breadcrumbs.length > 0) {
      const lastBreadcrumb = options.breadcrumbs[options.breadcrumbs.length - 1]
      if (lastBreadcrumb?.url) {
        pathSegments = lastBreadcrumb.url.replace(/^\//, '').split('/').filter(Boolean)
      }
    } else if (options.slug) {
      pathSegments = options.slug.split('/').filter(Boolean)
    }

    if (pathSegments.length === 0) {
      pathSegments = ['home']
    }

    const fullPath = pathSegments.join('/')

    for (const locale of locales) {
      const result = await payload.find({
        collection: 'page',
        limit: 1,
        pagination: false,
        overrideAccess: false,
        locale,
        where: {
          'breadcrumbs.url': {
            equals: `/${fullPath}`,
          },
          _status: {
            equals: 'published',
          },
        },
        select: {
          breadcrumbs: true,
        },
      })

      if (result.docs.length > 0) {
        const url = buildUrl({
          collection: 'page',
          breadcrumbs: result.docs[0].breadcrumbs,
          locale,
        })
        languages[locale] = url
      }
    }

    if (languages[I18N_CONFIG.defaultLocale as Locale]) {
      languages['x-default'] = languages[I18N_CONFIG.defaultLocale as Locale]
    }

    return languages
  }

  return languages
}
