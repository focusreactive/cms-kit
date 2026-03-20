import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Sets draft mode cookie on the current host.
 * Iframe: stays on localhost with path-based tenant (/en/t1/page-1), cookie is first-party.
 * New tab: runs on t1.localhost, cookie is set for that subdomain.
 */
export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const redirectPath = searchParams.get('redirect') || '/'
  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid preview secret', { status: 403 })
  }

  const host = req.headers.get('host') ?? new URL(req.url).host
  const protocol =
    req.headers.get('x-forwarded-proto') ?? new URL(req.url).protocol.replace(':', '')
  const redirectUrl = `${protocol}://${host}${redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`}`

  // When on same origin (e.g. localhost path-based iframe preview), draft.enable() works — cookie is first-party.
  const draft = await draftMode()
  draft.enable()
  return NextResponse.redirect(redirectUrl)
}
