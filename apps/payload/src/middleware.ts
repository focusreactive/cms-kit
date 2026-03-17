import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest } from 'next/server'
import { I18N_CONFIG } from '@/shared/config/i18n'
import { abAdapter } from '@/shared/lib/abTesting/abAdapter'
import type { ABVariantData } from '@/shared/lib/abTesting/types'
import { createResolveAbRewrite } from '@focus-reactive/payload-plugin-ab/middleware'
import { abCookies } from './shared/lib/abTesting/abCookies'

const intlMiddleware = createMiddleware(routing)

const localeCodes = I18N_CONFIG.locales.map((l) => l.code).join('|')
const localeRegex = new RegExp(`^/(${localeCodes})(/.*)?$`)

const resolveAbRewrite = createResolveAbRewrite<ABVariantData>({
  storage: abAdapter,
  getBucket: (v) => v.bucket,
  getRewritePath: (v) => v.rewritePath,
  getPassPercentage: (v) => v.passPercentage,
  cookies: abCookies,
})

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const localeMatch = pathname.match(localeRegex)

  if (localeMatch) {
    const [, locale, rest = ''] = localeMatch

    const isNextRoute = pathname.startsWith(`/${locale}/next/`)
    const isDraftMode = request.cookies.has('__prerender_bypass')

    if (!isNextRoute && !isDraftMode) {
      const abResponse = await resolveAbRewrite(request, pathname, pathname, pathname)

      if (abResponse) {
        abResponse.headers.set('x-pathname', pathname)
        return abResponse
      }
    }
  }

  // No locale yet — let intlMiddleware handle redirect (e.g. / → /en/)
  const response = intlMiddleware(request)
  response.headers.set('x-pathname', pathname)
  return response
}

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
}
