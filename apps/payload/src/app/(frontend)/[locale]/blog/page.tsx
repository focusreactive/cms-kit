import type { Metadata } from 'next/types'

import React, { Suspense } from 'react'
import { generateMeta } from '@/core/lib/generateMeta'
import { getBlogPageSettings } from '@/core/lib/getBlogPageSettings'
import { BLOG_CONFIG } from '@/core/config/blog'
import { BlogPageDynamic } from './_components/BlogPageDynamic'
import { BlogPageSkeleton } from './_components/BlogPageSkeleton'
import { BlogJsonLdWrapper } from './_components/BlogJsonLdWrapper'
import { Locale } from '@/core/types'
import { I18N_CONFIG } from '@/core/config/i18n'
import { getSiteSettings } from '@/core/lib/getSiteSettings'
import { Footer, Header } from '@/widgets'
import { Footer as FooterType, Header as HeaderType } from '@/payload-types'

type Props = {
  searchParams: Promise<{
    page?: string
  }>
  params: Promise<{
    locale: Locale
  }>
}

export const experimental_ppr = true

export default async function Page({ searchParams, params }: Props) {
  const { locale } = await params

  const siteSettings = await getSiteSettings({ locale })

  return (
    <>
      <Header data={siteSettings.header as HeaderType} />
      <main>
        <Suspense>
          <BlogJsonLdWrapper searchParams={searchParams} locale={locale} />
        </Suspense>
        <Suspense fallback={<BlogPageSkeleton />}>
          <BlogPageDynamic searchParams={searchParams} locale={locale} />
        </Suspense>
      </main>
      <Footer data={siteSettings.footer as FooterType} />
    </>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const blogSettings = await getBlogPageSettings({ locale })

  return generateMeta({
    doc: {
      title: blogSettings.blogTitle || '',
      slug: BLOG_CONFIG.slug,
      meta: {
        title: blogSettings.blogMeta?.title,
        description: blogSettings.blogMeta?.description || blogSettings.blogDescription,
        image: blogSettings.blogMeta?.image,
        robots: blogSettings.blogMeta?.robots,
      },
    },
    collection: 'posts',
    locale,
  })
}

export async function generateStaticParams() {
  return I18N_CONFIG.locales.map((locale) => ({
    locale: locale.code,
  }))
}
