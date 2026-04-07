import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { Pool } from 'pg'
import type { Page } from '@/payload-types'
import { extractPageText } from '@/collections/Page/extractPageText'
import { generateEmbedding } from '@/search/generateEmbedding'
import { upsertEmbedding, deleteEmbedding } from '@/search/dbOperations'
import { buildUrl } from '@/core/utils/path/buildUrl'
import { I18N_CONFIG } from '@/core/config/i18n'

async function getFirstHeroImage(
  blocks: Page['blocks'],
  req: Parameters<CollectionAfterChangeHook<Page>>[0]['req'],
): Promise<{
  imageUrl: string | null
  imageAlt: string | null
}> {
  const hero = blocks?.find((block) => block.blockType === 'hero')
  if (!hero || hero.blockType !== 'hero') return { imageUrl: null, imageAlt: null }

  const raw = hero.image?.image
  if (!raw) return { imageUrl: null, imageAlt: null }

  const media =
    typeof raw === 'number'
      ? await req.payload.findByID({ collection: 'media', id: raw, req })
      : raw

  return {
    imageUrl: media.url ?? null,
    imageAlt: media.alt,
  }
}

export const indexPageEmbedding: CollectionAfterChangeHook<Page> = async ({ doc, req }) => {
  if (doc._status !== 'published') return doc

  try {
    const locale = (req.locale ?? I18N_CONFIG.defaultLocale) as string
    const text = extractPageText(doc)
    const embedding = await generateEmbedding(text)
    const pool = (req.payload.db as unknown as { pool: Pool }).pool
    const url =
      buildUrl({
        collection: 'page',
        slug: doc.slug ?? '',
        breadcrumbs: doc.breadcrumbs,
        locale,
        absolute: false,
      }) || '/'

    const { imageUrl, imageAlt } = await getFirstHeroImage(doc.blocks, req)

    await upsertEmbedding({
      pool,
      documentId: String(doc.id),
      collection: 'page',
      locale,
      embedding,
      title: doc.title,
      slug: doc.slug ?? '',
      url,
      imageUrl,
      imageAlt,
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
