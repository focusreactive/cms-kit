import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { I18N_CONFIG } from '@/core/config/i18n'
import { BLOG_CONFIG } from '@/core/config/blog'
import { Locale } from '@/core/types'

export type BlogPostStaticParams = Array<{ locale: string; slug: string }>

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
          slug: post.slug,
        })
      }
    }
  }

  return results
}
