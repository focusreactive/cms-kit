import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { I18N_CONFIG } from '@/shared/config/i18n'
import { BLOG_CONFIG } from '@/shared/config/blog'
import { Locale } from '@/shared/types'
import { getAllTenantDomains } from './tenants'
import { isTenantEnabled, getDefaultTenantId, getDefaultDomain } from '@/shared/config/tenant'

export type BlogPostStaticParams = Array<{ locale: string; domain: string; slug: string }>

export async function getBlogPostStaticParams(): Promise<BlogPostStaticParams> {
  const payload = await getPayload({ config: configPromise })

  const tenants = isTenantEnabled()
    ? await getAllTenantDomains()
    : [{ id: getDefaultTenantId(), domain: getDefaultDomain() }]

  const results: BlogPostStaticParams = []

  for (const localeConfig of I18N_CONFIG.locales) {
    const locale = localeConfig.code as Locale

    for (const tenant of tenants) {
      const posts = await payload.find({
        collection: BLOG_CONFIG.collection,
        draft: false,
        limit: 1000,
        overrideAccess: true,
        pagination: false,
        locale,
        where: {
          _status: { equals: 'published' },
          tenant: { equals: tenant.id },
        },
        select: { slug: true },
      })

      for (const post of posts.docs) {
        if (post.slug) {
          results.push({
            locale,
            domain: tenant.domain,
            slug: post.slug,
          })
        }
      }
    }
  }

  return results
}
