import type { Post } from '@/payload-types'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'excerpt' | 'title' | 'heroImage' | 'publishedAt' | 'updatedAt' | 'authors'
>