import type { Metadata } from 'next/types'

import React, { Suspense } from 'react'
import { generateMeta } from '@/shared/lib/generateMeta'
import { getBlogPageSettings } from '@/shared/lib/getBlogPageSettings'
import { BLOG_CONFIG } from '@/shared/config/blog'
import { BlogPageDynamic } from './_components/BlogPageDynamic'
import { BlogPageSkeleton } from './_components/BlogPageSkeleton'
import { BlogJsonLdWrapper } from './_components/BlogJsonLdWrapper'
import { Locale } from '@/shared/types'
import { I18N_CONFIG } from '@/shared/config/i18n'
import { getAllTenantDomains } from '@/shared/lib/staticParams/tenants'
import { getSiteSettings } from '@/shared/lib/getSiteSettings'
import { Footer, Header } from '@/widgets'
import { Footer as FooterType, Header as HeaderType } from '@/payload-types'
import { isTenantEnabled, getDefaultDomain } from '@/shared/config/tenant'

type Props = {
  searchParams: Promise<{
    page?: string
  }>
  params: Promise<{
    locale: Locale
    domain: string
  }>
}

export const experimental_ppr = true

export default async function Page({ searchParams, params }: Props) {
  const { locale, domain } = await params

  const siteSettings = await getSiteSettings({ locale, domain })

  return (
    <>
      <Header data={siteSettings.header as HeaderType} />
      <main>
        <Suspense>
          <BlogJsonLdWrapper searchParams={searchParams} locale={locale} domain={domain} />
        </Suspense>
        <Suspense fallback={<BlogPageSkeleton />}>
          <BlogPageDynamic searchParams={searchParams} locale={locale} domain={domain} />
        </Suspense>
      </main>
      <Footer data={siteSettings.footer as FooterType} />
    </>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, domain } = await params

  const blogSettings = await getBlogPageSettings({ locale, domain })

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
    domain,
  })
}

export async function generateStaticParams() {
  if (!isTenantEnabled()) {
    return I18N_CONFIG.locales.map((locale) => ({
      locale: locale.code,
      domain: getDefaultDomain(),
    }))
  }

  const tenants = await getAllTenantDomains()
  return I18N_CONFIG.locales.flatMap((locale) =>
    tenants.map((t) => ({ locale: locale.code, domain: t.domain })),
  )
}
