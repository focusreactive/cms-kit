import { revalidateTag } from 'next/cache'
import { Payload } from 'payload'
import { getPathFromBreadcrumbs } from './buildUrl'
import { cacheTag } from './cacheTags'
import { Page } from '@/payload-types'
import { Locale } from '../types'

export function revalidatePageCache(params: {
  doc: Page
  locale: Locale
  payload: Payload
}): void {
  const path = getPathFromBreadcrumbs(params.doc.breadcrumbs) ?? 'home'
  params.payload.logger?.info?.(`Revalidating page with slug: ${params.doc.slug}`)
  revalidateTag(cacheTag({ type: 'page', path, locale: params.locale }))
  revalidateTag(cacheTag({ type: 'sitemap' }))
}
