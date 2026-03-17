import React from 'react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/shared/lib/generateMeta'
import { generateNotFoundMeta } from '@/shared/lib/generateNotFoundMeta'
import { I18N_CONFIG } from '@/shared/config/i18n'
import { Header, Footer } from '@/widgets'
import type { Footer as FooterType, Header as HeaderType, Page } from '@/payload-types'
import type { Locale } from '@/shared/types'
import { findPageVariantBySlug } from '@/shared/lib/page/findPageVariantBySlug'
import { parseSlugToPath } from '@/shared/lib/parseSlugToPath'
import { PayloadRedirects } from '@/features'
import { redirect } from '@/i18n/navigation'
import { manifestKeyToExpId } from '@/shared/lib/abTesting/cookieName'
import { ExperimentTracker } from '@focus-reactive/payload-plugin-ab/analytics/client'
import { resolveAbCookieNames } from '@focus-reactive/payload-plugin-ab/analytics'
import { abCookies } from '@/shared/lib/abTesting/abCookies'

interface Props {
  params: Promise<{
    locale: Locale
    slug?: string[]
    bucketID: string
  }>
}

export default async function VariantSlugPage({ params }: Props) {
  const { locale, slug = [], bucketID } = await params
  const { isEnabled: draft } = await draftMode()

  const { decodedSegments, url } = parseSlugToPath(slug)

  const variant = await findPageVariantBySlug({
    bucketID,
    slug: decodedSegments,
    locale,
    draft,
  })

  if (decodedSegments[0] === 'home') {
    return redirect({ href: '/' + decodedSegments.slice(1).join('/'), locale })
  }

  if (!variant) {
    return <PayloadRedirects url={url} locale={locale} />
  }

  const parentPage = typeof variant.page === 'object' ? (variant.page as Page) : null
  const header = (variant.header ?? parentPage?.header) as HeaderType
  const footer = (variant.footer ?? parentPage?.footer) as FooterType

  const experimentId = manifestKeyToExpId(
    `/${locale}${slug.length ? '/' + slug.join('/') : ''}`,
  )

  const cookieNames = resolveAbCookieNames(abCookies, experimentId)

  return (
    <>
      <PayloadRedirects disableNotFound url={url} locale={locale} />
      <ExperimentTracker experimentId={experimentId} {...cookieNames} />

      <Header data={header} />

      <main>
        <RenderBlocks blocks={variant.blocks} />
      </main>

      <Footer data={footer} />
    </>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug = [], bucketID } = await params
  const { isEnabled: draft } = await draftMode()
  const { decodedSegments } = parseSlugToPath(slug)

  const variant = await findPageVariantBySlug({
    bucketID,
    slug: decodedSegments,
    locale,
    draft,
  })
  if (!variant) return generateNotFoundMeta({ locale })

  const parentPage = typeof variant.page === 'object' ? (variant.page as Page) : null

  const docForMeta: Partial<Page> = {
    ...(parentPage ?? {}),
    meta: { ...(parentPage?.meta ?? {}), ...(variant.meta ?? {}) } as Page['meta'],
  }

  return generateMeta({
    doc: docForMeta,
    collection: 'page',
    locale,
  })
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const { docs: variants } = await payload.find({
    collection: 'page-variants',
    depth: 2,
    limit: 1000,
    overrideAccess: true,
    pagination: false,
  })

  const locales = I18N_CONFIG.locales.map((l) => l.code as Locale)
  const results: Array<{ locale: string; slug: string[]; bucketID: string }> = []

  for (const variant of variants) {
    const page = typeof variant.page === 'object' ? (variant.page as Page) : null
    if (!page) continue

    for (const locale of locales) {
      const localePage = await payload.findByID({
        collection: 'page',
        id: page.id,
        depth: 0,
        locale: locale as any,
        overrideAccess: true,
        select: { breadcrumbs: true },
      })

      const breadcrumbs = (localePage as any)?.breadcrumbs ?? []
      const lastUrl: string = breadcrumbs[breadcrumbs.length - 1]?.url ?? ''

      if (!lastUrl || lastUrl === '/home' || lastUrl === '/') continue

      const slugParts = lastUrl.replace(/^\//, '').split('/').filter(Boolean)
      if (!slugParts.length) continue

      results.push({ locale, slug: slugParts, bucketID: variant.bucketID as string })
    }
  }

  return results
}
