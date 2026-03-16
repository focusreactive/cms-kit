import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { BLOG_CONFIG } from '@/shared/config/blog'
import type { Post } from '@/payload-types'
import { Locale } from '../types'
import { cacheTag } from './cacheTags'
import { resolveLocale } from './resolveLocale'

async function getPostBySlugQuery(
  slug: string,
  domain: string,
  resolvedLocale: Locale,
  draft: boolean,
): Promise<Post | null> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: BLOG_CONFIG.collection,
    draft,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    locale: resolvedLocale,
    where: {
      slug: { equals: slug },
      ...(!draft && { _status: { equals: 'published' } }),
    },
  })

  return (result.docs?.[0] as Post) || null
}

export const getPostBySlug = cache(
  async ({
    slug,
    locale,
    domain = '',
  }: {
    slug: string
    locale?: Locale
    domain?: string
  }): Promise<Post | null> => {
    const { isEnabled: draft } = await draftMode()
    const resolvedLocale = await resolveLocale(locale)

    if (draft) {
      return getPostBySlugQuery(slug, domain, resolvedLocale, true)
    }

    return unstable_cache(
      () => getPostBySlugQuery(slug, domain, resolvedLocale, false),
      [slug, domain, resolvedLocale],
      {
        tags: [
          cacheTag({ type: 'post', domain, slug, locale: resolvedLocale }),
          cacheTag({ type: 'postsList', domain, locale: resolvedLocale }),
        ],
      },
    )()
  },
)
