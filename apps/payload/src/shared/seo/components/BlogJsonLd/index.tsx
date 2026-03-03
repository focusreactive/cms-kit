import React from 'react'
import type { BlogPageSetting, Post } from '@/payload-types'
import { createBlogSchema } from '@/shared/seo/schemas'
import { JsonLd } from '../JsonLd'
import { Locale } from '@/shared/types'

type PostPreview = Pick<Post, 'title' | 'slug' | 'publishedAt' | 'updatedAt' | 'authors' | 'meta'>

interface BlogJsonLdProps {
  settings: BlogPageSetting
  posts: PostPreview[]
  siteName?: string
  locale: Locale
  domain: string
}

export function BlogJsonLd({ settings, posts, siteName, locale, domain }: BlogJsonLdProps) {
  const structuredData = createBlogSchema({ settings, posts, siteName, locale, domain })
  return <JsonLd data={structuredData} />
}
