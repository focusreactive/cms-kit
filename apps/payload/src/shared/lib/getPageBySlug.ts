import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { Locale } from '../types'
import { cacheTag } from './cacheTags'
import { resolveLocale } from './resolveLocale'
import { getAllDocuments } from './getAllDocuments'

async function getPageBySlugQuery(
  pathSegmentsNorm: string[],
  domain: string,
  resolvedLocale: Locale,
  draft: boolean,
): Promise<RequiredDataFromCollectionSlug<'page'> | null> {
  const fullPath = pathSegmentsNorm.join('/')
  const targetUrl = `/${fullPath}`
  const payload = await getPayload({ config: configPromise })

  const result = await getAllDocuments(payload, 'page', {
    draft,
    depth: 4,
    overrideAccess: true,
    locale: resolvedLocale,
    where: {
      ...(!draft && {
        _status: { equals: 'published' },
      }),
    },
    select: {
      parent: false,
      folder: false,
      generateSlug: false,
    },
  })

  const doc = result.find((p) => p?.breadcrumbs?.length && p.breadcrumbs.at(-1)?.url === targetUrl)

  return doc ?? null
}

export const getPageBySlug = cache(
  async (
    pathSegments: string[],
    domain: string,
    locale?: Locale,
  ): Promise<RequiredDataFromCollectionSlug<'page'> | null> => {
    const { isEnabled: draft } = await draftMode()
    const resolvedLocale = await resolveLocale(locale)
    const pathSegmentsNorm = pathSegments.length === 0 ? ['home'] : [...pathSegments]
    const pathKey = pathSegmentsNorm.join('/')

    if (draft) {
      return getPageBySlugQuery(pathSegmentsNorm, domain, resolvedLocale, draft)
    }

    const res = cacheTag({ type: 'page', domain, path: pathKey, locale: resolvedLocale })

    return unstable_cache(
      () => getPageBySlugQuery(pathSegmentsNorm, domain, resolvedLocale, false),
      [pathKey, domain, resolvedLocale],
      {
        tags: [res],
      },
    )()
  },
)
