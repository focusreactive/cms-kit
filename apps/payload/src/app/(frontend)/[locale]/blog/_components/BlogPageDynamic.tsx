import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getPosts } from '@/core/lib/getPosts'
import { getBlogPageSettings } from '@/core/lib/getBlogPageSettings'
import { BlogPageContent } from '@/widgets'
import { BLOG_CONFIG } from '@/core/config/blog'
import { Locale } from '@/core/types'
import { redirect } from '@/i18n/navigation'

type BlogPageDynamicProps = {
  searchParams: Promise<{
    page?: string
    categories?: string
  }>
  locale: Locale
}

export async function BlogPageDynamic({ searchParams, locale }: BlogPageDynamicProps) {
  const { page, categories: categoriesParam } = await searchParams
  const pageNumber = page ? parseInt(page, 10) : 1
  const activeCategories = categoriesParam?.split(',').filter(Boolean) ?? []

  if (pageNumber < 1 || !Number.isInteger(pageNumber)) {
    redirect({ href: BLOG_CONFIG.basePath, locale })
  }

  const payload = await getPayload({ config: configPromise })

  const [posts, blogSettings, allCategories] = await Promise.all([
    getPosts(payload, { page: pageNumber, locale, categories: activeCategories }),
    getBlogPageSettings({ locale }),
    payload.find({
      collection: 'categories',
      depth: 0,
      limit: 100,
      locale,
      sort: 'title',
      overrideAccess: false,
      select: { title: true, slug: true },
    }),
  ])

  if (pageNumber > posts.totalPages && posts.totalPages > 0) {
    redirect({ href: BLOG_CONFIG.basePath, locale })
  }

  return (
    <BlogPageContent
      posts={posts.docs}
      currentPage={posts.page}
      totalPages={posts.totalPages}
      totalDocs={posts.totalDocs}
      readMoreLabel={blogSettings.readMoreLabel}
      categories={allCategories.docs}
      activeCategories={activeCategories}
    />
  )
}
