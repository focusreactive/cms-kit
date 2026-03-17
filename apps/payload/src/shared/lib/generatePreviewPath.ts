import { BLOG_CONFIG } from '@/shared/config/blog'

type Props = {
  collection: 'page' | typeof BLOG_CONFIG.collection
  slug: string
  path: string
}

export const generatePreviewPath = ({ collection, slug, path }: Props) => {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
