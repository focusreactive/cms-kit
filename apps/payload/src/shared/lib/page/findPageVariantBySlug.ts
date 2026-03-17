import { PageVariant } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function findPageVariantBySlug({
  bucketID,
  slug,
  locale,
  draft,
}: {
  bucketID: string
  slug: string[]
  locale: string
  draft: boolean
}): Promise<PageVariant | null> {
  const payload = await getPayload({ config: configPromise })
  const targetUrl = `/${slug.join('/')}`
  const isHome = targetUrl === '/' || targetUrl === '/home'

  const { docs } = await payload.find({
    collection: 'page-variants',
    where: { bucketID: { equals: bucketID } },
    depth: 2,
    locale: locale as any,
    draft,
    overrideAccess: true,
    limit: 50,
  })

  return (
    docs.find((v) => {
      const page = typeof v.page === 'object' ? v.page : null
      if (!page) return false

      const lastUrl = (page.breadcrumbs ?? []).at(-1)?.url ?? ''

      if (isHome) return !lastUrl || lastUrl === '/home' || lastUrl === '/'

      return lastUrl === targetUrl
    }) ?? null
  )
}
