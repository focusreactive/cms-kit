import type { Pool } from 'pg'
import type { SearchResultItem, SearchResultGroup, SearchCollection } from './types'

const SCORE_THRESHOLD = 0.8
const RRF_K = 60
const RESULTS_PER_GROUP = 3

const TS_CONFIG: Record<string, string> = {
  en: 'english',
  es: 'spanish',
}

interface DbRow {
  document_id: string
  collection: SearchCollection
  title: string
  slug: string
  url: string
  image_url: string | null
  image_alt: string | null
  rrf_score: string
}

interface RunHybridSearchParams {
  pool: Pool
  query: string
  embedding: number[]
  locale: string
}

export async function runHybridSearch({
  pool,
  query,
  embedding,
  locale,
}: RunHybridSearchParams): Promise<SearchResultItem[]> {
  const vectorStr = `[${embedding.join(',')}]`
  const tsConfig = TS_CONFIG[locale] ?? 'english'

  const { rows } = await pool.query<DbRow>(
    `WITH semantic AS (
       SELECT
         document_id, collection, title, slug, url, image_url, image_alt,
         ROW_NUMBER() OVER (ORDER BY embedding <=> $1::vector) AS rank
       FROM document_embeddings
       WHERE locale = $2
         AND (embedding <=> $1::vector) < ${SCORE_THRESHOLD}
     ),
     fts AS (
       SELECT
         document_id, collection, title, slug, url, image_url, image_alt,
         ROW_NUMBER() OVER (
           ORDER BY title ASC, slug ASC
         ) AS rank
       FROM document_embeddings
       WHERE locale = $2
         AND (
           to_tsvector($3, title) @@ plainto_tsquery($3, $4)
           OR to_tsvector('simple', regexp_replace(slug, '[-_/]+', ' ', 'g')) @@ plainto_tsquery('simple', $4)
         )
     ),
     combined AS (
       SELECT
         COALESCE(s.document_id, f.document_id) AS document_id,
         COALESCE(s.collection,  f.collection)  AS collection,
         COALESCE(s.title,       f.title)        AS title,
         COALESCE(s.slug,        f.slug)          AS slug,
         COALESCE(s.url,         f.url)           AS url,
         COALESCE(s.image_url,   f.image_url)     AS image_url,
         COALESCE(s.image_alt,   f.image_alt)     AS image_alt,
         COALESCE(1.0 / (${RRF_K} + s.rank), 0)
           + COALESCE(1.0 / (${RRF_K} + f.rank), 0) AS rrf_score
       FROM semantic s
       FULL OUTER JOIN fts f USING (document_id, collection)
     ),
     per_collection AS (
       SELECT *,
         ROW_NUMBER() OVER (
           PARTITION BY collection ORDER BY rrf_score DESC
         ) AS collection_rank
       FROM combined
     )
     SELECT document_id, collection, title, slug, url, image_url, image_alt, rrf_score
     FROM per_collection
     WHERE collection_rank <= ${RESULTS_PER_GROUP}
     ORDER BY collection, rrf_score DESC`,
    [vectorStr, locale, tsConfig, query],
  )

  return rows.map((row) => ({
    documentId: row.document_id,
    collection: row.collection,
    title: row.title,
    slug: row.slug,
    url: row.url,
    imageUrl: row.image_url,
    imageAlt: row.image_alt,
    score: parseFloat(row.rrf_score),
  }))
}

export function groupResultsByCollection(items: SearchResultItem[]): SearchResultGroup[] {
  const map = new Map<SearchCollection, SearchResultItem[]>()

  for (const item of items) {
    const existing = map.get(item.collection) ?? []
    map.set(item.collection, [...existing, item])
  }

  return Array.from(map.entries())
    .map(([collection, groupItems]) => ({
      collection,
      items: groupItems,
      topScore: groupItems[0]?.score ?? 0,
    }))
    .sort((a, b) => b.topScore - a.topScore)
}
