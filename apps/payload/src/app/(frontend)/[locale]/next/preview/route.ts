import type { CollectionSlug, PayloadRequest } from 'payload'
import { getPayload } from 'payload'

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import configPromise from '@payload-config'

import { I18N_CONFIG } from '@/core/config/i18n'
import { shouldIncludeLocalePrefix } from '@/core/lib/localePrefix'
import type { Locale } from '@/core/types'

export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug
  const slug = searchParams.get('slug')
  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret !== process.env.NEXT_PUBLIC_PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  if (!path || !collection || !slug) {
    return new Response('Insufficient search params', { status: 404 })
  }

  if (!path.startsWith('/')) {
    return new Response('This endpoint can only be used for relative previews', { status: 500 })
  }

  let user

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    })
  } catch (error) {
    payload.logger.error({ err: error }, 'Error verifying token for live preview')
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const host = req.headers.get('host') ?? new URL(req.url).host
  const protocol =
    req.headers.get('x-forwarded-proto') ?? new URL(req.url).protocol.replace(':', '')

  const pathSegments = path.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]

  const localeCodes = I18N_CONFIG.locales.map((l) => l.code)
  const locale: Locale = localeCodes.includes(firstSegment as Locale)
    ? (firstSegment as Locale)
    : (I18N_CONFIG.defaultLocale as Locale)

  const localeSegment = shouldIncludeLocalePrefix(locale) ? `/${locale}` : ''
  const previewInitUrl = `${protocol}://${host}${localeSegment}/next/preview-init?redirect=${encodeURIComponent(path)}&previewSecret=${encodeURIComponent(previewSecret)}`

  redirect(previewInitUrl)
}
