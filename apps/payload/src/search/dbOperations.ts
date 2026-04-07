'use server'

import type { Pool } from 'pg'
import type { SearchCollection } from './types'

interface UpsertParams {
  pool: Pool
  documentId: string
  collection: SearchCollection
  locale: string
  embedding: number[]
  title: string
  slug: string
  url: string
  imageUrl: string | null
  imageAlt: string | null
}

export async function upsertEmbedding({
  pool,
  documentId,
  collection,
  locale,
  embedding,
  title,
  slug,
  url,
  imageUrl,
  imageAlt,
}: UpsertParams) {
  const vectorStr = `[${embedding.join(',')}]`

  await pool.query(
    `INSERT INTO document_embeddings
       (document_id, collection, locale, embedding, title, slug, url,
        image_url, image_alt, updated_at)
     VALUES
       ($1, $2, $3, $4::vector, $5, $6, $7, $8, $9, NOW())
     ON CONFLICT (document_id, collection, locale)
     DO UPDATE SET
       embedding  = EXCLUDED.embedding,
       title      = EXCLUDED.title,
       slug       = EXCLUDED.slug,
       url        = EXCLUDED.url,
       image_url  = EXCLUDED.image_url,
       image_alt  = EXCLUDED.image_alt,
       updated_at = NOW()`,
    [documentId, collection, locale, vectorStr, title, slug, url, imageUrl, imageAlt],
  )
}

interface DeleteParams {
  pool: Pool
  documentId: string
  collection: SearchCollection
}

export async function deleteEmbedding({ pool, documentId, collection }: DeleteParams) {
  await pool.query('DELETE FROM document_embeddings WHERE document_id = $1 AND collection = $2', [
    documentId,
    collection,
  ])
}
