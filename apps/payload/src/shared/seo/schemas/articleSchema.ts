import type { Media, Post } from '@/payload-types'
import { buildUrl } from '@/shared/lib/buildUrl'
import { getServerSideURL } from '@/shared/lib/getURL'
import { formatAuthorsToSchema } from '../lib/formatAuthorsToSchema'
import { Locale } from '@/shared/types'

interface ArticleSchemaParams {
  post: Post
  siteName?: string
  locale: Locale
  domain: string
}

export function createArticleSchema({ post, siteName, locale, domain }: ArticleSchemaParams) {
  const postUrl = buildUrl({
    collection: 'posts',
    slug: post.slug,
    locale,
    domain,
  })
  const baseUrl = getServerSideURL()
  const image = post.meta?.image as Media | undefined
  const imageUrl = image && typeof image === 'object' ? `${baseUrl}${image.url}` : undefined
  const authors = formatAuthorsToSchema(post.authors)

  const publisher = siteName
    ? {
        '@type': 'Organization',
        name: siteName,
        url: buildUrl({ collection: 'page', locale, domain }),
      }
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    url: postUrl,
    inLanguage: locale,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
      inLanguage: locale,
    },
    ...(post.meta?.description && { description: post.meta.description }),
    ...(imageUrl && { image: imageUrl }),
    ...(post.publishedAt && {
      datePublished: new Date(post.publishedAt).toISOString(),
    }),
    ...(post.updatedAt && {
      dateModified: new Date(post.updatedAt).toISOString(),
    }),
    ...(authors && authors.length > 0 && { author: authors.length === 1 ? authors[0] : authors }),
    ...(publisher && { publisher: publisher }),
  }
}
