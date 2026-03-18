import type { Post } from '@/payload-types'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'heroImage' | 'publishedAt' | 'updatedAt' | 'authors'
>