import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { I18N_CONFIG } from '@/shared/config/i18n'
import { BLOG_CONFIG } from '@/shared/config/blog'
import { Locale } from '@/shared/types'
const DEFAULT_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'main'

export type BlogPostStaticParams = Array<{ locale: string; domain: string; slug: string }>

export async function getBlogPostStaticParams(): Promise<BlogPostStaticParams> {
  const payload = await getPayload({ config: configPromise })

  const results: BlogPostStaticParams = []

  for (const localeConfig of I18N_CONFIG.locales) {
    const locale = localeConfig.code as Locale

    const posts = await payload.find({
      collection: BLOG_CONFIG.collection,
      draft: false,
      limit: 1000,
      overrideAccess: true,
      pagination: false,
      locale,
      where: {
        _status: { equals: 'published' },
      },
      select: { slug: true },
    })

    for (const post of posts.docs) {
      if (post.slug) {
        results.push({
          locale,
          domain: DEFAULT_DOMAIN,
          slug: post.slug,
        })
      }
    }
  }

  return results
}
