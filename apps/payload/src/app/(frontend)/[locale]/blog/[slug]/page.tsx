import type { Metadata } from 'next'

import React from 'react'

import { PayloadRedirects } from '@/features'
import { generateMeta } from '@/core/lib/generateMeta'
import { getSiteSettings } from '@/core/lib/getSiteSettings'
import { buildUrl } from '@/core/utils/path/buildUrl'
import { getPostBySlug } from '@/core/lib/getPostBySlug'
import { generateNotFoundMeta } from '@/core/lib/generateNotFoundMeta'
import { getBlogPageSettings } from '@/core/lib/getBlogPageSettings'
import { ArticleJsonLd, BreadcrumbsJsonLd } from '@/core/seo/components'
import { getBlogPostStaticParams } from '@/core/lib/staticParams/posts'
import { Footer, Header, PostContent } from '@/widgets'
import { Locale } from '@/core/types'
import { Footer as FooterType, Header as HeaderType } from '@/payload-types'

type Args = {
  params: Promise<{
    slug?: string
    locale: Locale
  }>
}

export default async function Page({ params }: Args) {
  const { slug = '', locale } = await params
  const decodedSlug = decodeURIComponent(slug)
  const url = buildUrl({ collection: 'posts', slug: decodedSlug, locale })

  const [post, siteSettings, blogSettings] = await Promise.all([
    getPostBySlug({ slug: decodedSlug, locale }),
    getSiteSettings({ locale }),
    getBlogPageSettings({ locale }),
  ])

  if (!post) {
    return <PayloadRedirects url={url} locale={locale} />
  }

  return (
    <>
      <Header data={siteSettings.header as HeaderType} />
      <main>
        <ArticleJsonLd post={post} siteName={siteSettings.siteName as string} locale={locale} />
        <BreadcrumbsJsonLd
          locale={locale}
          blog={{
            title: blogSettings.blogTitle || 'Blog',
            post: {
              title: post.title,
              slug: post.slug ?? decodedSlug,
            },
          }}
        />

        <PayloadRedirects disableNotFound url={url} locale={locale} />

        <PostContent post={post} />
      </main>
      <Footer data={siteSettings.footer as FooterType} />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = '', locale } = await params
  const decodedSlug = decodeURIComponent(slug)
  const post = await getPostBySlug({ slug: decodedSlug, locale })

  if (!post) {
    return generateNotFoundMeta({ locale })
  }

  return generateMeta({
    doc: post,
    collection: 'posts',
    locale,
  })
}

export async function generateStaticParams() {
  return getBlogPostStaticParams()
}
