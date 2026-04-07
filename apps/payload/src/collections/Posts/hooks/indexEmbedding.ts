import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { Pool } from 'pg'
import type { Post } from '@/payload-types'
import { extractPostText } from '@/collections/Posts/extractPostText'
import { generateEmbedding } from '@/search/generateEmbedding'
import { upsertEmbedding, deleteEmbedding } from '@/search/dbOperations'
import { I18N_CONFIG } from '@/core/config/i18n'

export const indexPostEmbedding: CollectionAfterChangeHook<Post> = async ({ doc, req }) => {
  if (doc._status !== 'published') return doc

  try {
    const locale = (req.locale ?? I18N_CONFIG.defaultLocale) as string
    const text = extractPostText(doc)
    const embedding = await generateEmbedding(text)
    const pool = (req.payload.db as unknown as { pool: Pool }).pool

    await upsertEmbedding({
      pool,
      documentId: String(doc.id),
      collection: 'post',
      locale,
      embedding,
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
