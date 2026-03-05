import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Payload } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Post } from '@/payload-types'
import type { Locale } from '@/shared/types'
import { cacheTag } from '@/shared/lib/cacheTags'
import { getDomainFromGlobalDoc } from '@/shared/lib/getGlobals'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'

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
    const domain = await getDomainFromGlobalDoc(doc)

    if (doc._status === 'published') {
      revalidatePostTags(domain, doc?.slug ?? '', locale, payload)
      revalidateTag(cacheTag({ type: 'sitemap' }))
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const prevDomain = await getDomainFromGlobalDoc(previousDoc)

      revalidatePostTags(prevDomain, previousDoc?.slug ?? '', locale, payload)
      revalidateTag(cacheTag({ type: 'sitemap' }))
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = async ({ doc, req }) => {
  const { payload, context } = req

  if (!context.disableRevalidate) {
    const locale = getLocaleFromRequest(req)
    const domain = await getDomainFromGlobalDoc(doc)

    revalidatePostTags(domain, doc?.slug ?? '', locale, payload)
    revalidateTag(cacheTag({ type: 'sitemap' }))
  }

  return doc
}
