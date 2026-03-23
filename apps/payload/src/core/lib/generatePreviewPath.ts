import { BLOG_CONFIG } from '@/core/config/blog'

type Props = {
  collection: 'page' | typeof BLOG_CONFIG.collection
  slug: string
  path: string
}

export const generatePreviewPath = ({ collection, slug, path }: Props) => {
  const params: Record<string, string> = {
    collection,
    slug,
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  }

  const encodedParams = new URLSearchParams(params)
  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
