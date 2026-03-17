import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Payload } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Post } from '@/payload-types'
import type { Locale } from '@/shared/types'
import { cacheTag } from '@/shared/lib/cacheTags'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'

function revalidatePostTags(slug: string, locale: Locale, payload: Payload) {
  payload.logger?.info?.(`Revalidating post with slug: ${slug}`)

  revalidateTag(cacheTag({ type: 'post', slug, locale }))
  revalidateTag(cacheTag({ type: 'postsList', locale }))
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
      revalidatePostTags(doc?.slug ?? '', locale, payload)
      revalidateTag(cacheTag({ type: 'sitemap' }))
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePostTags(previousDoc?.slug ?? '', locale, payload)
      revalidateTag(cacheTag({ type: 'sitemap' }))
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = async ({ doc, req }) => {
  const { payload, context } = req

  if (!context.disableRevalidate) {
    const locale = getLocaleFromRequest(req)

    revalidatePostTags(doc?.slug ?? '', locale, payload)
    revalidateTag(cacheTag({ type: 'sitemap' }))
  }

  return doc
}
