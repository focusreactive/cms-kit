import type React from 'react'
import type { Page } from '@/payload-types'
import { redirect, permanentRedirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import { getCachedRedirects } from '@/shared/lib/getRedirects'
import { getCachedDocumentByID } from '@/shared/lib/getDocument'
import { BLOG_CONFIG } from '@/shared/config/blog'
import { buildUrl } from '@/shared/lib/buildUrl'
import { canonicalRedirectFrom } from '@/shared/lib/redirectUrl'
import { Locale } from '@/shared/types'

interface Props {
  disableNotFound?: boolean
  url: string
  locale: Locale
}

export const PayloadRedirects: React.FC<Props> = async ({
  disableNotFound,
  url,
  locale,
}) => {
  const redirects = await getCachedRedirects({ locale })()
  const canonicalUrl = canonicalRedirectFrom(url)
  const redirectItem = redirects.find((r) => canonicalRedirectFrom(r.from) === canonicalUrl)

  if (!redirectItem || !redirectItem.isActive) {
    if (disableNotFound) return null
    notFound()
  }

  let redirectUrl: string | null = null

  if (redirectItem.to?.type === 'custom') {
    redirectUrl = redirectItem.to?.url || null
  } else if (redirectItem.to?.type === 'reference' && redirectItem.to?.reference) {
    const { reference } = redirectItem.to
    const collection = reference.relationTo

    if (typeof reference.value === 'number') {
      const document = (await getCachedDocumentByID(collection, reference.value)()) as Page | null

      if (collection === 'page' && document && 'breadcrumbs' in document) {
        redirectUrl = buildUrl({
          collection: 'page',
          breadcrumbs: document.breadcrumbs,
          locale,
        })
      } else if (
        collection === BLOG_CONFIG.collection &&
        document &&
        'slug' in document &&
        document.slug
      ) {
        redirectUrl = buildUrl({ collection: 'posts', slug: document.slug, locale })
      } else if (document && 'slug' in document && document.slug && 'breadcrumbs' in document) {
        redirectUrl = buildUrl({
          collection: 'page',
          breadcrumbs: document.breadcrumbs,
          locale,
        })
      }
    } else if (typeof reference.value === 'object' && reference.value?.slug) {
      if (collection === 'page' && 'breadcrumbs' in reference.value) {
        redirectUrl = buildUrl({
          collection: 'page',
          breadcrumbs: reference.value.breadcrumbs,
          locale,
        })
      } else if (collection === BLOG_CONFIG.collection) {
        redirectUrl = buildUrl({
          collection: 'posts',
          slug: reference.value.slug || '',
          locale,
        })
      } else {
        redirectUrl = buildUrl({
          collection: 'page',
          breadcrumbs: reference.value.breadcrumbs,
          locale,
        })
      }
    }
  }

  if (redirectUrl) {
    if (redirectItem.type === '308') {
      permanentRedirect(redirectUrl)
    } else {
      redirect(redirectUrl)
    }
  }

  if (disableNotFound) return null
  notFound()
}
