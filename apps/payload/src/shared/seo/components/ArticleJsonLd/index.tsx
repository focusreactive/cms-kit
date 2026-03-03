import React from 'react'
import type { Post } from '@/payload-types'
import { createArticleSchema } from '@/shared/seo/schemas'
import { JsonLd } from '../JsonLd'
import { Locale } from '@/shared/types'

interface ArticleJsonLdProps {
  post: Post
  siteName?: string
  locale: Locale
  domain: string
}

export function ArticleJsonLd({ post, siteName, locale, domain }: ArticleJsonLdProps) {
  const structuredData = createArticleSchema({ post, siteName, locale, domain })
  return <JsonLd data={structuredData} />
}
