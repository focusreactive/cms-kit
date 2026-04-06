import type { Pool } from 'pg'
import type { SearchResultItem, SearchResultGroup, SearchCollection } from './types'

interface DbRow {
  document_id: string
  collection: SearchCollection
  title: string
  slug: string
  url: string
  image_url: string | null
  image_alt: string | null
  score: string
}

interface RunSemanticSearchParams {
  pool: Pool
  embedding: number[]
  locale: string
  limit?: number
  maxPerCollection?: number
  scoreThreshold?: number
}

export async function runSemanticSearch({
  pool,
  embedding,
  locale,
  limit = 20,
  maxPerCollection = 5,
  scoreThreshold = 0.75,
}: RunSemanticSearchParams): Promise<SearchResultItem[]> {
  const vectorStr = `[${embedding.join(',')}]`

  const { rows } = await pool.query<DbRow>(
    `WITH semantic AS (
       SELECT
         document_id,
         collection,
         title,
         slug,
         url,
         image_url,
         image_alt,
         embedding <=> $1::vector AS distance,
         ROW_NUMBER() OVER (
           PARTITION BY collection 
           ORDER BY embedding <=> $1::vector
         ) AS collection_rank
       FROM document_embeddings
       WHERE locale = $2
         AND embedding <=> $1::vector < $3
     )
     SELECT
       document_id,
       collection,
       title,
       slug,
       url,
       image_url,
       image_alt,
       (1.0 / (1.0 + distance)) AS score
     FROM semantic
     WHERE collection_rank <= $4
     ORDER BY collection, distance ASC
     LIMIT $5`,
    [vectorStr, locale, scoreThreshold, maxPerCollection, limit],
  )

  return rows.map((row) => ({
    documentId: row.document_id,
    collection: row.collection,
    title: row.title,
    slug: row.slug,
    url: row.url,
    imageUrl: row.image_url,
    imageAlt: row.image_alt,
    score: parseFloat(row.score),
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
