import type { Locale } from '@/shared/types'

export type CacheTagParams =
  | { type: 'post'; domain: string; slug: string; locale: Locale }
  | { type: 'postsList'; domain: string; locale: Locale }
  | { type: 'page'; domain: string; path: string; locale: Locale }
  | { type: 'redirect'; domain: string; locale: Locale }
  | { type: 'sitemap' }

export function cacheTag(params: CacheTagParams): string {
  if (params.type === 'sitemap') return 'sitemap'

  const { type, domain, locale } = params

  switch (type) {
    case 'page':
      return `page_${domain}_${params.path}_${locale}`
    case 'post':
      return `post_${domain}_${params.slug}_${locale}`
    case 'postsList':
      return `posts_${domain}_${locale}`
    case 'redirect':
      return `redirect_${domain}_${locale}`
  }
}
