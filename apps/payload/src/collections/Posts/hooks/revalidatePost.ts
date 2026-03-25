import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Payload } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Post } from '@/payload-types'
import type { Locale } from '@/core/types'
import { cacheTag } from '@/core/lib/cacheTags'
import { getLocaleFromRequest } from '@/core/lib/getLocaleFromRequest'
import { BLOG_CONFIG } from '@/core/config/blog'

function revalidatePostTags(slug: string, locale: Locale, payload: Payload) {
  payload.logger?.info?.(`Revalidating post with slug: ${slug}`)

  revalidateTag(cacheTag({ type: 'post', slug, locale }))
  revalidateTag(cacheTag({ type: 'postsList', locale }))
}

async function revalidateRelatedPosts(doc: Post, locale: Locale, payload: Payload) {
  const categoryIds = (doc.categories ?? []).map((cat) =>
    typeof cat === 'object' ? cat.id : cat,
  ).filter(Boolean)

  if (categoryIds.length === 0) return

  const { docs: siblingPosts } = await payload.find({
    collection: BLOG_CONFIG.collection,
    where: {
      and: [
        { id: { not_equals: doc.id } },
        { categories: { in: categoryIds } },
        { _status: { equals: 'published' } },
      ],
    },
    select: { slug: true },
    limit: 0,
    pagination: false,
    overrideAccess: true,
    locale,
    context: { disableRevalidate: true },
  })

  for (const sibling of siblingPosts) {
    if (sibling.slug) {
      payload.logger?.info?.(`Revalidating related post: ${sibling.slug}`)
      revalidateTag(cacheTag({ type: 'post', slug: sibling.slug, locale }))
    }
  }
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
      await revalidateRelatedPosts(doc, locale, payload)
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePostTags(previousDoc?.slug ?? '', locale, payload)
      revalidateTag(cacheTag({ type: 'sitemap' }))
      await revalidateRelatedPosts(doc, locale, payload)
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
    await revalidateRelatedPosts(doc, locale, payload)
  }

  return doc
}
