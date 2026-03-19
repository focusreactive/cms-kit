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
  }>
  locale: Locale
}

export async function BlogPageDynamic({ searchParams, locale }: BlogPageDynamicProps) {
  const { page } = await searchParams
  const pageNumber = page ? parseInt(page, 10) : 1

  if (pageNumber < 1 || !Number.isInteger(pageNumber)) {
    redirect({ href: BLOG_CONFIG.basePath, locale })
  }

  const payload = await getPayload({ config: configPromise })

  const [posts, blogSettings] = await Promise.all([
    getPosts(payload, { page: pageNumber, locale }),
    getBlogPageSettings({ locale }),
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
      title={blogSettings.blogTitle}
    />
  )
}
