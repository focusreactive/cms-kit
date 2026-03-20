import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { I18N_CONFIG } from '@/core/config/i18n'

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const redirectPath = searchParams.get('redirect') || '/'
  const previewSecret = searchParams.get('previewSecret')
  const locale = searchParams.get('locale')

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid preview secret', { status: 403 })
  }

  const host = req.headers.get('host') ?? new URL(req.url).host
  const protocol =
    req.headers.get('x-forwarded-proto') ?? new URL(req.url).protocol.replace(':', '')
  const redirectUrl = `${protocol}://${host}${redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`}`

  const draft = await draftMode()
  draft.enable()

  const isValidLocale = !!(locale && I18N_CONFIG.locales.some(({ code }) => code === locale))
  const response = NextResponse.redirect(redirectUrl)

  if (isValidLocale) {
    response.cookies.set('NEXT_LOCALE', locale, { path: '/', sameSite: 'lax' })
  }

  return response
}
