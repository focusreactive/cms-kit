import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { PayloadRedirects } from '@/features'
import { Metadata } from 'next'
import { generateMeta } from '@/shared/lib/generateMeta'
import { generateNotFoundMeta } from '@/shared/lib/generateNotFoundMeta'
import { getPageBySlug } from '@/shared/lib/getPageBySlug'
import { BreadcrumbsJsonLd } from '@/shared/seo/components'
import { parseSlugToPath } from '@/shared/lib/parseSlugToPath'
import { Locale } from '@/shared/types'
import { redirect } from '@/i18n/navigation'
import { getMainSitePageStaticParams } from '@/shared/lib/staticParams/pages'
import { Footer, Header } from '@/widgets'
import { Footer as FooterType, Header as HeaderType } from '@/payload-types'

type Args = {
  params: Promise<{
    slug?: string[]
    locale: Locale
  }>
}

export default async function Page({ params }: Args) {
  const { slug = [], locale } = await params
  const { decodedSegments, url } = parseSlugToPath(slug)

  if (decodedSegments[0] === 'home') {
    return redirect({ href: '/' + decodedSegments.slice(1).join('/'), locale })
  }

  const page = await getPageBySlug(decodedSegments, locale)

  if (!page) {
    return <PayloadRedirects url={url} locale={locale} />
  }

  return (
    <>
      <Header data={page.header as HeaderType} />
      <main>
        <div>
          <BreadcrumbsJsonLd items={page.breadcrumbs} locale={locale} />

          <PayloadRedirects disableNotFound url={url} locale={locale} />

          <RenderBlocks blocks={page.blocks} />
        </div>
      </main>
      <Footer data={page.footer as FooterType} />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = [], locale } = await params
  const { decodedSegments } = parseSlugToPath(slug)

  const page = await getPageBySlug(decodedSegments, locale)

  if (!page) {
    return generateNotFoundMeta({ locale })
  }

  return generateMeta({
    doc: page,
    collection: 'page',
    locale,
  })
}

export async function generateStaticParams() {
  return await getMainSitePageStaticParams()
}
