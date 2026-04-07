'use server'

import { getPayload } from 'payload'
import { generateEmbedding } from './generateEmbedding'
import { SearchResultGroup } from './types'
import configPromise from '@payload-config'
import { groupResultsByCollection, runSemanticSearch } from './runSemanticSearch'
import { getDocumentSearchData } from './getDocumentSearchData'
import { Pool } from 'pg'

type Response =
  | {
      success: true
      data: SearchResultGroup[]
    }
  | {
      success: false
      error: string
    }

interface Params {
  query: string
  locale: string
}

const VALID_LOCALES = new Set(['en', 'es'])

export async function search({ query, locale }: Params): Promise<Response> {
  if (!VALID_LOCALES.has(locale)) {
    return {
      success: true,
      data: [],
    }
  }

  try {
    const [embedding, payload] = await Promise.all([
      generateEmbedding(query),
      getPayload({ config: configPromise }),
    ])

    const pool = payload.db.pool as unknown as Pool
    const rawItems = await runSemanticSearch({ pool, embedding, locale })

    const enrichedItems = await Promise.all(
      rawItems.map(async (item) => {
        const displayData = await getDocumentSearchData(
          payload,
          item.documentId,
          item.collection,
          item.locale,
        )

        if (!displayData) return null

        return { ...item, ...displayData }
      }),
    )

    const items = enrichedItems.filter((item) => item !== null)
    const groups = groupResultsByCollection(items)

    return {
      success: true,
      data: groups,
    }
  } catch (error) {
    console.error('[search] error:', error)

    return {
      success: false,
      error: error as string,
    }
  }
}
