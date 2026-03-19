import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { BLOG_CONFIG } from '@/core/config/blog'
import type { Post } from '@/payload-types'
import { Locale } from '../types'
import { cacheTag } from './cacheTags'
import { resolveLocale } from './resolveLocale'

async function getPostBySlugQuery(
  slug: string,
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
  }: {
    slug: string
    locale?: Locale
  }): Promise<Post | null> => {
    const { isEnabled: draft } = await draftMode()
    const resolvedLocale = await resolveLocale(locale)

    if (draft) {
      return getPostBySlugQuery(slug, resolvedLocale, true)
    }

    return unstable_cache(
      () => getPostBySlugQuery(slug, resolvedLocale, false),
      [slug, resolvedLocale],
      {
        tags: [
          cacheTag({ type: 'post', slug, locale: resolvedLocale }),
          cacheTag({ type: 'postsList', locale: resolvedLocale }),
        ],
      },
    )()
  },
)
