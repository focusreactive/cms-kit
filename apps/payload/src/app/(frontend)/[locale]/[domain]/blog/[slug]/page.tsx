import type { Metadata } from 'next'

import React from 'react'

import { PayloadRedirects } from '@/features'
import { generateMeta } from '@/shared/lib/generateMeta'
import { getSiteSettings } from '@/shared/lib/getSiteSettings'
import { buildUrl } from '@/shared/lib/buildUrl'
import { getPostBySlug } from '@/shared/lib/getPostBySlug'
import { generateNotFoundMeta } from '@/shared/lib/generateNotFoundMeta'
import { getBlogPageSettings } from '@/shared/lib/getBlogPageSettings'
import { ArticleJsonLd, BreadcrumbsJsonLd } from '@/shared/seo/components'
import { getBlogPostStaticParams } from '@/shared/lib/staticParams/posts'
import { Footer, Header, PostContent } from '@/widgets'
import { Locale } from '@/shared/types'
import { Footer as FooterType, Header as HeaderType } from '@/payload-types'

type Args = {
  params: Promise<{
    slug?: string
    locale: Locale
    domain: string
  }>
}

export default async function Page({ params }: Args) {
  const { slug = '', locale, domain } = await params
  const decodedSlug = decodeURIComponent(slug)
  const url = buildUrl({ collection: 'posts', slug: decodedSlug, locale, domain })

  const [post, siteSettings, blogSettings] = await Promise.all([
    getPostBySlug({ slug: decodedSlug, locale, domain }),
    getSiteSettings({ locale, domain }),
    getBlogPageSettings({ locale, domain }),
  ])

  if (!post) {
    return <PayloadRedirects url={url} locale={locale} domain={domain} />
  }

  return (
    <>
      <Header data={siteSettings.header as HeaderType} />
      <main>
        <ArticleJsonLd
          post={post}
          siteName={siteSettings.siteName as string}
          locale={locale}
          domain={domain}
        />
        <BreadcrumbsJsonLd
          locale={locale}
          domain={domain}
          blog={{
            title: blogSettings.blogTitle || 'Blog',
            post: {
              title: post.title,
              slug: post.slug ?? decodedSlug,
            },
          }}
        />

        <PayloadRedirects disableNotFound url={url} locale={locale} domain={domain} />

        <PostContent post={post} />
      </main>
      <Footer data={siteSettings.footer as FooterType} />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = '', locale, domain } = await params
  const decodedSlug = decodeURIComponent(slug)
  const post = await getPostBySlug({ slug: decodedSlug, locale, domain })

  if (!post) {
    return generateNotFoundMeta({ locale, domain })
  }

  return generateMeta({
    doc: post,
    collection: 'posts',
    locale,
    domain,
  })
}

export async function generateStaticParams() {
  return getBlogPostStaticParams()
}
