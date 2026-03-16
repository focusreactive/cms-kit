import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Payload } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Post } from '@/payload-types'
import type { Locale } from '@/shared/types'
import { cacheTag } from '@/shared/lib/cacheTags'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'

const DEFAULT_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'main'

function revalidatePostTags(domain: string, slug: string, locale: Locale, payload: Payload) {
  payload.logger?.info?.(`Revalidating post with slug: ${slug}`)

  revalidateTag(cacheTag({ type: 'post', domain, slug, locale }))
  revalidateTag(cacheTag({ type: 'postsList', domain, locale }))
}

export const revalidatePost: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req,
}) => {
  const { payload, context } = req

  if (!context.disableRevalidate) {
    const locale = getLocaleFromRequest(req)

    if (doc._status === 'published') {
      revalidatePostTags(DEFAULT_DOMAIN, doc?.slug ?? '', locale, payload)
      revalidateTag(cacheTag({ type: 'sitemap' }))
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePostTags(DEFAULT_DOMAIN, previousDoc?.slug ?? '', locale, payload)
      revalidateTag(cacheTag({ type: 'sitemap' }))
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = async ({ doc, req }) => {
  const { payload, context } = req

  if (!context.disableRevalidate) {
    const locale = getLocaleFromRequest(req)

    revalidatePostTags(DEFAULT_DOMAIN, doc?.slug ?? '', locale, payload)
    revalidateTag(cacheTag({ type: 'sitemap' }))
  }

  return doc
}
