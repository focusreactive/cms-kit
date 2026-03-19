import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { getServerSideURL } from '@/core/lib/getURL'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = getServerSideURL()
  const headersList = await headers()
  const host = headersList.get('x-forwarded-host') ?? headersList.get('host')
  const proto =
    headersList.get('x-forwarded-proto') ?? (baseUrl.startsWith('https') ? 'https' : 'http')
  const sitemapBase = host ? `${proto}://${host}` : baseUrl

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/next/', '/*?draft=true', '/*&draft=true'],
      },
    ],
    sitemap: `${sitemapBase}/sitemap.xml`,
  }
}
