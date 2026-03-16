import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { I18N_CONFIG } from '@/shared/config/i18n'
import { Locale } from '@/shared/types'
const DEFAULT_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'main'

export type PageStaticParams = Array<{ locale: string; domain: string; slug: string[] }>

function isHomeSlug(slug: string[]): boolean {
  if (slug.length === 0) return true
  if (slug.length === 1 && (slug[0] === 'home' || slug[0] === '')) return true
  return false
}

export async function getMainSitePageStaticParams(): Promise<PageStaticParams> {
  const payload = await getPayload({ config: configPromise })

  const results: PageStaticParams = []

  for (const localeConfig of I18N_CONFIG.locales) {
    const locale = localeConfig.code as Locale

    const pages = await payload.find({
      collection: 'page',
      draft: false,
      limit: 1000,
      depth: 2,
      overrideAccess: true,
      pagination: false,
      locale,
      where: {
        _status: { equals: 'published' },
      },
      select: {
        slug: true,
        breadcrumbs: true,
      },
    })

    for (const page of pages.docs) {
      const slug =
        (page?.breadcrumbs?.length
          ? page.breadcrumbs?.at(-1)?.url?.split('/')?.filter(Boolean)
          : page?.slug?.split('/')) ?? []

      if (isHomeSlug(slug)) continue

      results.push({
        locale,
        domain: DEFAULT_DOMAIN,
        slug,
      })
    }
  }

  return results
}
