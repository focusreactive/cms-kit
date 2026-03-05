import type { CollectionSlug, PayloadRequest } from 'payload'
import { getPayload } from 'payload'

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import configPromise from '@payload-config'
import { isTenantEnabled, getDefaultTenantId, getDefaultDomain } from '@/shared/config/tenant'

export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug
  const slug = searchParams.get('slug')
  const previewSecret = searchParams.get('previewSecret')
  const tenantIdParam = searchParams.get('tenantId')

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const tenantId = isTenantEnabled() ? tenantIdParam : tenantIdParam || String(getDefaultTenantId())

  if (!path || !collection || !slug || !tenantId) {
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

  let domain: string
  if (isTenantEnabled()) {
    const tenant = await payload.find({
      collection: 'tenants',
      where: {
        id: {
          equals: tenantId,
        },
      },
      limit: 1,
      depth: 0,
    })
    domain = tenant.docs[0]?.domain || ''
  } else {
    domain = getDefaultDomain()
  }

  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  // You can add additional checks here to see if the user is allowed to preview this page

  // Don't call draft.enable() here: cookie would be set for current host (e.g. localhost),
  // but we redirect to tenant subdomain (e.g. t1.localhost) — cookies are domain-bound.
  const host = req.headers.get('host') ?? new URL(req.url).host
  const protocol =
    req.headers.get('x-forwarded-proto') ?? new URL(req.url).protocol.replace(':', '')
  const locale = path.split('/')[1] || 'en'

  // Iframe (Payload live preview): stay on same origin so cookie is first-party and works.
  const isIframe = req.headers.get('sec-fetch-dest') === 'iframe'
  if (isIframe) {
    // In multi-tenant: redirect to path-based tenant URL (e.g. /en/t1/page-1) instead of subdomain
    // In single-tenant: no domain prefix needed — middleware handles rewrite
    const redirectPath = isTenantEnabled()
      ? path.replace(new RegExp(`^/${locale}/?`), `/${locale}/${domain}/`)
      : path
    const previewInitUrl = `${protocol}://${host}/${locale}/next/preview-init?redirect=${encodeURIComponent(redirectPath)}&previewSecret=${encodeURIComponent(previewSecret)}`
    redirect(previewInitUrl)
  }

  // Single-tenant: redirect without domain prefix — middleware handles rewrite
  if (!isTenantEnabled()) {
    const previewInitUrl = `${protocol}://${host}/${locale}/next/preview-init?redirect=${encodeURIComponent(path)}&previewSecret=${encodeURIComponent(previewSecret)}`
    redirect(previewInitUrl)
  }

  const previewInitUrl = `${protocol}://${domain}.${host}/${locale}/next/preview-init?redirect=${encodeURIComponent(path)}&previewSecret=${encodeURIComponent(previewSecret)}`
  redirect(previewInitUrl)
}
