import { revalidateTag } from 'next/cache'
import { Payload } from 'payload'
import { getPathFromBreadcrumbs } from './buildUrl'
import { cacheTag } from './cacheTags'
import { Page } from '@/payload-types'
import { Locale } from '../types'

export function revalidatePageCache(params: {
  doc: Page
  domain: string
  locale: Locale
  payload: Payload
}): void {
  const path = getPathFromBreadcrumbs(params.doc.breadcrumbs) ?? 'home'
  params.payload.logger?.info?.(`Revalidating page with slug: ${params.doc.slug}`)
  revalidateTag(cacheTag({ type: 'page', domain: params.domain, path, locale: params.locale }))
  revalidateTag(cacheTag({ type: 'sitemap' }))
}
