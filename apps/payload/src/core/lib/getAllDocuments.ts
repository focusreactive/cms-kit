import type { CollectionSlug, DataFromCollectionSlug, Payload, Where } from 'payload'
import { Locale } from '../types'

interface GetAllDocumentsOptions {
  where?: Where
  select?: Record<string, boolean>
  sort?: string
  limit?: number
  depth?: number
  overrideAccess?: boolean
  locale?: Locale
  draft?: boolean
}

interface FindOptions {
  collection: CollectionSlug
  where?: Where
  select?: Record<string, boolean>
  sort?: string
  page?: number
  limit?: number
  depth?: number
  overrideAccess?: boolean
  locale?: Locale
  draft?: boolean
}

export async function getAllDocuments<TSlug extends CollectionSlug>(
  payload: Payload,
  collection: TSlug,
  options: GetAllDocumentsOptions = { locale: 'en' as Locale },
): Promise<DataFromCollectionSlug<TSlug>[]> {
  const {
    where,
    select,
    sort = '-createdAt',
    limit = 1000,
    depth = 0,
    overrideAccess = false,
    locale,
    draft,
  } = options

  const find = payload.find as unknown as (
    args: FindOptions,
  ) => Promise<{ docs: DataFromCollectionSlug<TSlug>[]; totalPages: number }>

  const firstPage = await find({
    collection,
    where,
    select,
    sort,
    page: 1,
    depth,
    overrideAccess,
    locale,
    draft,
  })

  const allDocs: DataFromCollectionSlug<TSlug>[] = [...firstPage.docs]
  const totalPages = firstPage.totalPages

  if (totalPages <= 1) {
    return allDocs
  }

  for (let page = 2; page <= totalPages; page++) {
    const result = await find({
      collection,
      where,
      select,
      sort,
      limit,
      page,
      depth,
      overrideAccess,
      locale,
    })
    allDocs.push(...result.docs)
  }

  return allDocs
}
