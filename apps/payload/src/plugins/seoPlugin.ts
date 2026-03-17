import { Page, Post } from '@/payload-types'
import { buildUrl } from '@/shared/lib/buildUrl'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'
import { getSiteSettings } from '@/shared/lib/getSiteSettings'
import { getServerSideURL } from '@/shared/lib/getURL'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateTitle, GenerateDescription, GenerateURL } from '@payloadcms/plugin-seo/types'

const generateTitle: GenerateTitle<Page | Post> = async ({ doc }) => {
  const settings = await getSiteSettings({})
  return doc.title || settings?.defaultOgTitle || ''
}

const generateDescription: GenerateDescription<Page | Post> = async ({ doc }) => {
  const settings = await getSiteSettings({})
  return doc?.meta?.description || settings.defaultDescription || ''
}

const generateURL: GenerateURL<Page | Post> = async ({ doc, collectionSlug, req }) => {
  const baseUrl = getServerSideURL()
  const locale = getLocaleFromRequest(req)
  switch (collectionSlug) {
    case 'page': {
      const pageDoc = doc as Page
      return buildUrl({ collection: 'page', breadcrumbs: pageDoc.breadcrumbs, locale })
    }
    case 'posts': {
      const postDoc = doc as Post
      return buildUrl({ collection: 'posts', slug: postDoc?.slug, locale })
    }
    default:
      return baseUrl
  }
}

export default seoPlugin({
  generateTitle,
  generateDescription,
  generateURL,
})
