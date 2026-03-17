import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { Locale } from '../types'
import { cacheTag } from './cacheTags'

export async function getRedirects(locale: Locale) {
  const payload = await getPayload({ config: configPromise })

  const { docs: redirects } = await payload.find({
    collection: 'redirects',
    depth: 2,
    limit: 0,
    locale,
    pagination: false,
  })

  return redirects
}

export const getCachedRedirects = ({ locale }: { locale: Locale }) =>
  unstable_cache(async () => getRedirects(locale), ['redirects', locale], {
    tags: ['redirects', cacheTag({ type: 'redirect', locale })],
  })
