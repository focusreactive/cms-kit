import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { Pool } from 'pg'
import type { Page } from '@/payload-types'
import { extractPageText } from '@/collections/Page/extractPageText'
import { generateEmbedding } from '@/search/generateEmbedding'
import { upsertEmbedding, deleteEmbedding } from '@/search/dbOperations'
import { I18N_CONFIG } from '@/core/config/i18n'

export const indexPageEmbedding: CollectionAfterChangeHook<Page> = async ({ doc, req }) => {
  if (doc._status !== 'published') return doc

  try {
    const locale = (req.locale ?? I18N_CONFIG.defaultLocale) as string
    const text = extractPageText(doc)
    const embedding = await generateEmbedding(text)
    const pool = (req.payload.db as unknown as { pool: Pool }).pool

    await upsertEmbedding({
      pool,
      documentId: String(doc.id),
      collection: 'page',
      locale,
      embedding,
    })
  } catch (err) {
    req.payload.logger.error({ err }, 'Failed to index page embedding')
  }

  return doc
}

export const deletePageEmbedding: CollectionAfterDeleteHook<Page> = async ({ doc, req }) => {
  try {
    const pool = (req.payload.db as unknown as { pool: Pool }).pool
    await deleteEmbedding({ pool, documentId: String(doc.id), collection: 'page' })
  } catch (err) {
    req.payload.logger.error({ err }, 'Failed to delete page embedding')
  }

  return doc
}
