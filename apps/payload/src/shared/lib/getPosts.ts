import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import type { Payload } from 'payload'
import { BLOG_CONFIG } from '@/shared/config/blog'
import { Locale } from '@/shared/types'
import { cacheTag } from './cacheTags'
import { resolveLocale } from './resolveLocale'

export interface GetPostsOptions {
  page?: number
  limit?: number
  overrideAccess?: boolean
  locale?: Locale
  domain: string
}

const getPostsQuery = cache(async (payload: Payload, options: GetPostsOptions) => {
  const {
    page = 1,
    limit = BLOG_CONFIG.postsPerPage,
    overrideAccess = false,
    locale,
  } = options

  return await payload.find({
    collection: BLOG_CONFIG.collection,
    depth: 1,
    limit,
    page,
    overrideAccess,
    locale,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
      publishedAt: true,
      updatedAt: true,
      authors: true,
    },
  })
})

export const getPosts = async (payload: Payload, options: GetPostsOptions) => {
  const { page = 1, limit = BLOG_CONFIG.postsPerPage, locale, domain } = options

  const resolvedLocale = await resolveLocale(locale)

  return unstable_cache(
    async () => getPostsQuery(payload, { page, limit, locale: resolvedLocale, domain }),
    [page.toString(), limit.toString(), resolvedLocale, domain],
    {
      tags: [cacheTag({ type: 'postsList', domain, locale: resolvedLocale })],
    },
  )()
}
