import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSideURL } from '@/shared/lib/getURL'
import { isTenantEnabled, getDefaultDomain } from '@/shared/config/tenant'
import { I18N_CONFIG } from '@/shared/config/i18n'
import { abAdapter } from '@/shared/lib/abTesting/abAdapter'
import type { ABVariantData } from '@/shared/lib/abTesting/types'
import { createResolveAbRewrite } from '@kiryl.pekarski/payload-plugin-ab/middleware'
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

  if (!isTenantEnabled()) {
    const domain = getDefaultDomain()
    const localeMatch = pathname.match(localeRegex)

    if (localeMatch) {
      const [, locale, rest = ''] = localeMatch
      const isNextRoute = pathname.startsWith(`/${locale}/next/`)

      // Redirect /en/{domain}/page → /en/page (strip internal domain from visible URL)
      if (!isNextRoute && rest.startsWith(`/${domain}`)) {
        const cleanRest = rest.slice(domain.length + 1) || '/'
        const url = request.nextUrl.clone()
        url.pathname = `/${locale}${cleanRest}`
        return NextResponse.redirect(url, 301)
      }

      if (!isNextRoute) {
        const rewritePath = `/${locale}/${domain}${rest || '/'}`
        const abResponse = await resolveAbRewrite(request, pathname, rewritePath, rewritePath)

        if (abResponse) {
          abResponse.headers.set('x-pathname', pathname)
          return abResponse
        }

        // No A/B variant — standard domain-injection rewrite
        const url = request.nextUrl.clone()
        url.pathname = rewritePath
        const response = NextResponse.rewrite(url)
        response.headers.set('x-pathname', pathname)
        return response
      }
    }

    // No locale yet — let intlMiddleware handle redirect (e.g. / → /en/)
    const response = intlMiddleware(request)
    response.headers.set('x-pathname', pathname)
    return response
  }

  const hostHeader = request.headers.get('host') || ''
  const [hostname] = hostHeader.split(':')

  const baseUrl = getServerSideURL()
  const baseUrlObj = new URL(baseUrl)
  const baseHostname = baseUrlObj.hostname
  const tenantRegex = new RegExp(`^(.+)\\.${baseHostname.replace(/\./g, '\\.')}$`)

  const tenantMatch = hostname.match(tenantRegex)
  const tenant = tenantMatch ? tenantMatch[1] : null

  if (tenant) {
    const localeMatch = pathname.match(localeRegex)
    if (localeMatch) {
      const [, locale, rest = ''] = localeMatch
      const isNextRoute = pathname.startsWith(`/${locale}/next/`)

      if (!isNextRoute) {
        const rewritePath = `/${locale}/${tenant}${rest}`
        const abResponse = await resolveAbRewrite(request, pathname, rewritePath, rewritePath)

        if (abResponse) {
          abResponse.headers.set('x-pathname', rewritePath)
          return abResponse
        }

        const url = request.nextUrl.clone()
        url.pathname = rewritePath
        const response = NextResponse.rewrite(url)
        response.headers.set('x-pathname', rewritePath)
        return response
      }
    }
  }

  const response = intlMiddleware(request)
  response.headers.set('x-pathname', pathname)
  return response
}

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
}
