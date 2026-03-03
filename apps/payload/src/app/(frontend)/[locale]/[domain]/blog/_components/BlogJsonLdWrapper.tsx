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
  domain: string
}

export async function BlogJsonLdWrapper({ searchParams, locale, domain }: BlogJsonLdWrapperProps) {
  const { page } = await searchParams
  const pageNumber = page ? parseInt(page, 10) : 1

  const payload = await getPayload({ config: configPromise })

  const [posts, blogSettings, siteSettings] = await Promise.all([
    getPosts(payload, { page: pageNumber, locale, domain }),
    getBlogPageSettings({ locale, domain }),
    getSiteSettings({ locale, domain }),
  ])

  return (
    <>
      <BlogJsonLd
        settings={blogSettings}
        posts={posts.docs}
        siteName={siteSettings.siteName as string}
        locale={locale}
        domain={domain}
      />
      <BreadcrumbsJsonLd
        locale={locale}
        domain={domain}
        blog={{
          title: blogSettings.title || 'Blog',
          ...(pageNumber > 1 && { page: pageNumber }),
        }}
      />
    </>
  )
}
