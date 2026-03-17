import React from 'react'
import type { Post } from '@/payload-types'
import type { BlogPageSettingsData } from '@/shared/lib/getBlogPageSettings'
import { createBlogSchema } from '@/shared/seo/schemas'
import { JsonLd } from '../JsonLd'
import { Locale } from '@/shared/types'

type PostPreview = Pick<Post, 'title' | 'slug' | 'publishedAt' | 'updatedAt' | 'authors' | 'meta'>

interface BlogJsonLdProps {
  settings: BlogPageSettingsData
  posts: PostPreview[]
  siteName?: string
  locale: Locale
}

export function BlogJsonLd({ settings, posts, siteName, locale }: BlogJsonLdProps) {
  const structuredData = createBlogSchema({ settings, posts, siteName, locale })
  return <JsonLd data={structuredData} />
}
