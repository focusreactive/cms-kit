import type { BlogPageSetting, Media, Post } from '@/payload-types'
import { getServerSideURL } from '@/shared/lib/getURL'
import { buildUrl } from '@/shared/lib/buildUrl'
import { formatAuthorsToSchema } from '../lib/formatAuthorsToSchema'
import { Locale } from '@/shared/types'

type PostPreview = Pick<Post, 'title' | 'slug' | 'publishedAt' | 'updatedAt' | 'authors' | 'meta'>

interface BlogSchemaParams {
  settings: BlogPageSetting
  posts: PostPreview[]
  siteName?: string
  locale: Locale
  domain: string
}

export function createBlogSchema({ settings, posts, siteName, locale, domain }: BlogSchemaParams) {
  const baseUrl = getServerSideURL()
  const blogUrl = buildUrl({ collection: 'posts', locale, domain })

  const description = settings.meta?.description || settings.description || ''

  const publisher = siteName
    ? {
        '@type': 'Organization',
        name: siteName,
        url: baseUrl,
      }
    : undefined

  const blogPostings = posts.map((post) => {
    const postUrl = buildUrl({ collection: 'posts', slug: post.slug, locale, domain })
    const image = post.meta?.image as Media | undefined
    const imageUrl = image && typeof image === 'object' ? `${baseUrl}${image.url}` : undefined

    const authors = formatAuthorsToSchema(post.authors)

    return {
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
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: settings.title,
    url: blogUrl,
    inLanguage: locale,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': blogUrl,
      inLanguage: locale,
    },
    ...(description && { description: description }),
    ...(publisher && { publisher: publisher }),
    ...(blogPostings.length > 0 && { blogPost: blogPostings }),
  }
}
