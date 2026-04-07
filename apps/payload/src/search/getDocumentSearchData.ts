'use server'

import type { Payload } from 'payload'
import type { SearchCollection } from './types'
import type { Page, Post, Media } from '@/payload-types'
import { buildUrl } from '@/core/utils/path/buildUrl'
import { Locale } from '@/core/types'

type DisplayData = {
  title: string
  slug: string
  url: string
  imageUrl: string | null
  imageAlt: string | null
}

export async function getDocumentSearchData(
  payload: Payload,
  documentId: string,
  collection: SearchCollection,
  locale: string,
): Promise<DisplayData | null> {
  if (collection === 'page') {
    let doc: Page

    try {
      doc = await payload.findByID({
        collection: 'page',
        id: documentId,
        locale: locale as Locale,
        depth: 1,
      })
    } catch {
      return null
    }

    const hero = doc.blocks?.find((b) => b.blockType === 'hero')
    let imageUrl: string | null = null
    let imageAlt: string | null = null

    if (hero && hero.blockType === 'hero') {
      const image = hero.image?.image

      if (image && typeof image !== 'number') {
        imageUrl = image.url ?? null
        imageAlt = image.alt
      }
    }

    return {
      title: doc.title,
      slug: doc.slug,
      url: buildUrl({
        collection: 'page',
        slug: doc.slug,
        breadcrumbs: doc.breadcrumbs,
        locale,
        absolute: false,
      }),
      imageUrl,
      imageAlt,
    }
  }

  if (collection === 'post') {
    let doc: Post

    try {
      doc = await payload.findByID({
        collection: 'posts',
        id: documentId,
        locale: locale as Locale,
        depth: 1,
      })
    } catch {
      return null
    }

    const heroImage = doc.heroImage
    let imageUrl: string | null = null
    let imageAlt: string | null = null

    if (heroImage && typeof heroImage !== 'number') {
      imageUrl = heroImage.url ?? null
      imageAlt = heroImage.alt
    }

    return {
      title: doc.title,
      slug: doc.slug,
      url: buildUrl({
        collection: 'posts',
        slug: doc.slug,
        locale,
        absolute: false,
      }),
      imageUrl,
      imageAlt,
    }
  }

  return null
}
