import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import type { Post } from '@/payload-types'
import { BLOG_CONFIG } from '@/core/config/blog'
import type { Locale } from '@/core/types'

const RELATED_POSTS_COUNT = 3

/**
 * Returns up to 3 related posts for a given post.
 * Prioritizes manually selected related posts, then backfills
 * from the same categories sorted by publish date (newest first).
 * Excludes the current post from results.
 * If not enough posts match the filters, returns only those available.
 */
export async function getRelatedPosts({
  post,
  locale,
}: {
  post: Post
  locale: Locale
}): Promise<Post[]> {
  const { isEnabled: draft } = await draftMode()

  const manualPosts = (post.relatedPosts ?? []).filter(
    (p): p is Post => typeof p === 'object' && p !== null,
  )

  if (manualPosts.length >= RELATED_POSTS_COUNT) {
    return manualPosts.slice(0, RELATED_POSTS_COUNT)
  }

  const remaining = RELATED_POSTS_COUNT - manualPosts.length
  const excludeIds = [post.id, ...manualPosts.map((p) => p.id)]

  const categoryIds = (post.categories ?? []).map((cat) =>
    typeof cat === 'object' ? cat.id : cat,
  ).filter(Boolean)

  if (categoryIds.length === 0) {
    return manualPosts
  }

  const payload = await getPayload({ config: configPromise })

  const { docs: backfillPosts } = await payload.find({
    collection: BLOG_CONFIG.collection,
    draft,
    where: {
      and: [
        { id: { not_in: excludeIds } },
        { categories: { in: categoryIds } },
        ...(!draft ? [{ _status: { equals: 'published' } }] : []),
      ],
    },
    sort: '-publishedAt',
    limit: remaining,
    depth: 1,
    locale,
    overrideAccess: true,
  })

  return [...manualPosts, ...backfillPosts]
}
