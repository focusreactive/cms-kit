'use server'

import type { Pool } from 'pg'
import type { SearchCollection } from './types'

interface UpsertParams {
  pool: Pool
  documentId: string
  collection: SearchCollection
  locale: string
  embedding: number[]
}

export async function upsertEmbedding({
  pool,
  documentId,
  collection,
  locale,
  embedding,
}: UpsertParams) {
  const vectorStr = `[${embedding.join(',')}]`

  await pool.query(
    `INSERT INTO document_embeddings
       (document_id, collection, locale, embedding, updated_at)
     VALUES
       ($1, $2, $3, $4::vector, NOW())
     ON CONFLICT (document_id, collection, locale)
     DO UPDATE SET
       embedding  = EXCLUDED.embedding,
       updated_at = NOW()`,
    [documentId, collection, locale, vectorStr],
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
