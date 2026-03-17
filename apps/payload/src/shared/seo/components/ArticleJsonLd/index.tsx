import React from 'react'
import type { Post } from '@/payload-types'
import { createArticleSchema } from '@/shared/seo/schemas'
import { JsonLd } from '../JsonLd'
import { Locale } from '@/shared/types'

interface ArticleJsonLdProps {
  post: Post
  siteName?: string
  locale: Locale
}

export function ArticleJsonLd({ post, siteName, locale }: ArticleJsonLdProps) {
  const structuredData = createArticleSchema({ post, siteName, locale })
  return <JsonLd data={structuredData} />
}
