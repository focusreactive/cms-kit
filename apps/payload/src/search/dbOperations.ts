import type { Pool } from 'pg'
import type { SearchCollection } from './types'

const TS_CONFIG: Record<string, string> = {
  en: 'english',
  es: 'spanish',
}

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
  ftsContent: string
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
  ftsContent,
}: UpsertParams) {
  const vectorStr = `[${embedding.join(',')}]`
  const tsConfig = TS_CONFIG[locale] ?? 'english'

  await pool.query(
    `INSERT INTO document_embeddings
       (document_id, collection, locale, embedding, title, slug, url,
        image_url, image_alt, fts_content, updated_at)
     VALUES
       ($1, $2, $3, $4::vector, $5, $6, $7, $8, $9,
        to_tsvector($10, $11), NOW())
     ON CONFLICT (document_id, collection, locale)
     DO UPDATE SET
       embedding    = EXCLUDED.embedding,
       title        = EXCLUDED.title,
       slug         = EXCLUDED.slug,
       url          = EXCLUDED.url,
       image_url    = EXCLUDED.image_url,
       image_alt    = EXCLUDED.image_alt,
       fts_content  = EXCLUDED.fts_content,
       updated_at   = NOW()`,
    [
      documentId,
      collection,
      locale,
      vectorStr,
      title,
      slug,
      url,
      imageUrl,
      imageAlt,
      tsConfig,
      ftsContent,
    ],
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
