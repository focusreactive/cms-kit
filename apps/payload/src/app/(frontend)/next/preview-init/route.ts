import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

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

  const draft = await draftMode()
  draft.enable()

  return NextResponse.redirect(redirectUrl)
}
