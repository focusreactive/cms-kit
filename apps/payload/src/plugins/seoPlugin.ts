import { Page, Post } from '@/payload-types'
import { buildUrl } from '@/shared/lib/buildUrl'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'
import { getSiteSettings } from '@/shared/lib/getSiteSettings'
import { getDomainByTenantId } from '@/shared/lib/getTenantByDomain'
import { getServerSideURL } from '@/shared/lib/getURL'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateTitle, GenerateDescription, GenerateURL } from '@payloadcms/plugin-seo/types'
import { isTenantEnabled, getDefaultTenantId } from '@/shared/config/tenant'

const tenantIdFromDoc = (doc: Page | Post): string | number | null | undefined => {
  const t = doc?.tenant
  if (t == null) {
    return isTenantEnabled() ? null : getDefaultTenantId()
  }
  return typeof t === 'object' && t !== null && 'id' in t ? t.id : (t as number)
}

const generateTitle: GenerateTitle<Page | Post> = async ({ doc }) => {
  const tenantId = tenantIdFromDoc(doc)
  const domain = await getDomainByTenantId(tenantId)
  const settings = await getSiteSettings({ domain })
  return doc.title || settings?.defaultOgTitle || ''
}

const generateDescription: GenerateDescription<Page | Post> = async ({ doc }) => {
  const tenantId = tenantIdFromDoc(doc)
  const domain = await getDomainByTenantId(tenantId)
  const settings = await getSiteSettings({ domain })
  return doc?.meta?.description || settings.defaultDescription || ''
}

const generateURL: GenerateURL<Page | Post> = async ({ doc, collectionSlug, req }) => {
  const baseUrl = getServerSideURL()
  const locale = getLocaleFromRequest(req)
  const tenantId = tenantIdFromDoc(doc)
  const domain = await getDomainByTenantId(tenantId)
  switch (collectionSlug) {
    case 'page': {
      const pageDoc = doc as Page
      return buildUrl({ collection: 'page', breadcrumbs: pageDoc.breadcrumbs, locale, domain })
    }
    case 'posts': {
      const postDoc = doc as Post
      return buildUrl({ collection: 'posts', slug: postDoc?.slug, locale, domain })
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
