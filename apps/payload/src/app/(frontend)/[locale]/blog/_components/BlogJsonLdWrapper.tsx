import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getPosts } from '@/shared/lib/getPosts'
import { getBlogPageSettings } from '@/shared/lib/getBlogPageSettings'
import { getSiteSettings } from '@/shared/lib/getSiteSettings'
import { BlogJsonLd, BreadcrumbsJsonLd } from '@/shared/seo/components'
import { Locale } from '@/shared/types'

type BlogJsonLdWrapperProps = {
  searchParams: Promise<{
    page?: string
  }>
  locale: Locale
}

export async function BlogJsonLdWrapper({ searchParams, locale }: BlogJsonLdWrapperProps) {
  const { page } = await searchParams
  const pageNumber = page ? parseInt(page, 10) : 1

  const payload = await getPayload({ config: configPromise })

  const [posts, blogSettings, siteSettings] = await Promise.all([
    getPosts(payload, { page: pageNumber, locale }),
    getBlogPageSettings({ locale }),
    getSiteSettings({ locale }),
  ])

  return (
    <>
      <BlogJsonLd
        settings={blogSettings}
        posts={posts.docs}
        siteName={siteSettings.siteName as string}
        locale={locale}
      />
      <BreadcrumbsJsonLd
        locale={locale}
        blog={{
          title: blogSettings.blogTitle || 'Blog',
          ...(pageNumber > 1 && { page: pageNumber }),
        }}
      />
    </>
  )
}
