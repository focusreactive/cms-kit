import type { MetadataRoute } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getServerSideURL } from '@/core/lib/getURL'
import { buildUrl } from '@/core/lib/buildUrl'
import { BLOG_CONFIG } from '@/core/config/blog'
import { getBlogPageSettings } from '@/core/lib/getBlogPageSettings'
import { getLastModifiedDate } from '@/core/lib/getLastModifiedDate'
import { getAllDocuments } from '@/core/lib/getAllDocuments'
import { cacheTag } from '@/core/lib/cacheTags'
import { I18N_CONFIG } from '@/core/config/i18n'
import type { Locale } from '@/core/types'

type Sitemap = MetadataRoute.Sitemap

async function generateSitemap(): Promise<Sitemap> {
  const payload = await getPayload({ config: configPromise })
  const baseUrl = getServerSideURL()
  const changeFrequency: Sitemap[number]['changeFrequency'] = 'weekly'
  const locales = I18N_CONFIG.locales.map((locale) => locale.code) as Locale[]
  try {
    const sitemap: Sitemap = []

    await Promise.all(
      locales.map(async (locale) => {
        const [allPages, allPosts, blogSettings] = await Promise.all([
          getAllDocuments(payload, 'page', {
            where: {
              _status: { equals: 'published' },
            },
            select: {
              slug: true,
              updatedAt: true,
              meta: true,
              breadcrumbs: true,
            },
            depth: 1,
            sort: '-updatedAt',
            overrideAccess: false,
            locale,
          }),
          getAllDocuments(payload, BLOG_CONFIG.collection, {
            where: {
              _status: { equals: 'published' },
            },
            select: {
              slug: true,
              publishedAt: true,
              updatedAt: true,
              meta: true,
            },
            sort: '-publishedAt',
            overrideAccess: false,
            locale,
          }),
          getBlogPageSettings({ locale }),
        ])

        const pages = allPages.filter((page) => {
          const robots = page.meta?.robots
          return robots === 'index' || robots === undefined
        })

        const posts = allPosts.filter((post) => {
          const robots = post.meta?.robots
          return robots === 'index' || robots === undefined
        })

        const homeUrl = buildUrl({ collection: 'page', locale })

        pages.forEach((page) => {
          const url = buildUrl({
            collection: 'page',
            breadcrumbs: page.breadcrumbs,
            locale,
          })
          const isHome = url === homeUrl
          sitemap.push({
            url,
            lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
            changeFrequency,
            priority: isHome ? 1.0 : 0.8,
          })
        })

        const blogLastModified = getLastModifiedDate(posts[0]?.publishedAt) || new Date()

        sitemap.push({
          url: buildUrl({ collection: 'posts', locale }),
          lastModified: blogLastModified,
          changeFrequency,
          priority: 0.9,
        })

        posts.forEach((post) => {
          sitemap.push({
            url: buildUrl({
              collection: 'posts',
              slug: post.slug,
              locale,
            }),
            lastModified: post.publishedAt
              ? new Date(post.publishedAt)
              : post.updatedAt
                ? new Date(post.updatedAt)
                : new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
          })
        })
      }),
    )

    return sitemap
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency,
        priority: 1.0,
      },
    ]
  }
}

const getCachedSitemap = unstable_cache(
  async () => generateSitemap(),
  [cacheTag({ type: 'sitemap' })],
  {
    tags: [cacheTag({ type: 'sitemap' })],
    revalidate: false,
  },
)

export default async function sitemap(): Promise<Sitemap> {
  return getCachedSitemap()
}
