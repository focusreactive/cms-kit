import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { Pool } from 'pg'
import type { Post, Media } from '@/payload-types'
import { extractPostText } from '@/search/extractText'
import { generateEmbedding } from '@/search/generateEmbedding'
import { upsertEmbedding, deleteEmbedding } from '@/search/dbOperations'
import { buildUrl } from '@/core/utils/path/buildUrl'
import { I18N_CONFIG } from '@/core/config/i18n'

function resolveImage(heroImage: Post['heroImage']): { url: string | null; alt: string | null } {
  if (!heroImage || typeof heroImage === 'number') return { url: null, alt: null }
  const media = heroImage as Media
  return {
    url: media.url ?? null,
    alt: typeof media.alt === 'string' ? media.alt : null,
  }
}

export const indexPostEmbedding: CollectionAfterChangeHook<Post> = async ({ doc, req }) => {
  if (doc._status !== 'published') return doc

  try {
    const locale = (req.locale ?? I18N_CONFIG.defaultLocale) as string
    const text = extractPostText(doc)
    const [embedding] = await Promise.all([generateEmbedding(text)])
    const { url: imageUrl, alt: imageAlt } = resolveImage(doc.heroImage)
    const pool = (req.payload.db as unknown as { pool: Pool }).pool
    const url = buildUrl({ collection: 'posts', slug: doc.slug ?? '', locale, absolute: false })

    await upsertEmbedding({
      pool,
      documentId: String(doc.id),
      collection: 'post',
      locale,
      embedding,
      title: doc.title,
      slug: doc.slug ?? '',
      url,
      imageUrl,
      imageAlt,
    })
  } catch (err) {
    req.payload.logger.error({ err }, 'Failed to index post embedding')
  }

  return doc
}

export const deletePostEmbedding: CollectionAfterDeleteHook<Post> = async ({ doc, req }) => {
  try {
    const pool = (req.payload.db as unknown as { pool: Pool }).pool

    await deleteEmbedding({ pool, documentId: String(doc.id), collection: 'post' })
  } catch (err) {
    req.payload.logger.error({ err }, 'Failed to delete post embedding')
  }

  return doc
}
