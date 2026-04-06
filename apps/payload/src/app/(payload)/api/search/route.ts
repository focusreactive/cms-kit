import { type NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Pool } from 'pg'
import { generateEmbedding } from '@/search/generateEmbedding'
import { runHybridSearch, groupResultsByCollection } from '@/search/hybridSearch'
import type { SearchResponse } from '@/search/types'

const VALID_LOCALES = new Set(['en', 'es'])
const MIN_QUERY_LENGTH = 2

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl
  const query = searchParams.get('q')?.trim() ?? ''
  const locale = searchParams.get('locale') ?? 'en'

  if (query.length < MIN_QUERY_LENGTH) {
    return NextResponse.json({ groups: [] } satisfies SearchResponse)
  }

  if (!VALID_LOCALES.has(locale)) {
    return NextResponse.json({ groups: [] } satisfies SearchResponse)
  }

  try {
    const [embedding, payload] = await Promise.all([
      generateEmbedding(query),
      getPayload({ config: configPromise }),
    ])

    const pool = (payload.db as unknown as { pool: Pool }).pool
    const items = await runHybridSearch({ pool, query, embedding, locale })
    const groups = groupResultsByCollection(items)

    return NextResponse.json({ groups } satisfies SearchResponse)
  } catch (err) {
    console.error('[search] route error:', err)
    return NextResponse.json({ error: 'Search unavailable, please try again.' }, { status: 503 })
  }
}
