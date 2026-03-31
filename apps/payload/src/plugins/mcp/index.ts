import type { Page } from '@/payload-types'
import { buildUrl } from '@/core/utils/path/buildUrl'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { trimPageResponse, trimPostResponse } from './overrides/trimResponse'
import { getDocumentFabric } from './tools/getDocumentFabric'
import { uploadImage } from './tools/uploadImage'

const [getPageContent, getPageField] = getDocumentFabric({
  collection: 'page',
  buildUrl: (doc) =>
    buildUrl({
      collection: 'page',
      breadcrumbs: doc.breadcrumbs as Page['breadcrumbs'],
      locale: 'en',
    }),
  skipKeys: [
    'generateSlug',
    'parent',
    'folder',
    '_abPassPercentage',
    '_abVariantOf',
    '_abVariantPercentages',
  ],
  richTextPreviewLength: 300,
})

const [getPostsContent, getPostsField] = getDocumentFabric({
  collection: 'posts',
})

export const mcpPluginConfig = mcpPlugin({
  collections: {
    page: {
      description:
        'Website pages built with a block-based layout system. Each page has a title, URL slug, nested hierarchy (parent/breadcrumbs), and a flexible block editor for composing content sections such as Hero, Content, FAQ, and more. Supports draft/publish versioning and localization (en/es). Use this collection to read, create, update or delete site pages.',
      enabled: true,
      overrideResponse: trimPageResponse,
    },
    posts: {
      description:
        'Blog posts. Each post has a title, excerpt, hero image, rich-text body, SEO metadata, categories, authors, and related posts. Supports draft/publish versioning and localization (en/es). Use this collection to read, create, update or delete blog articles.',
      enabled: true,
      overrideResponse: trimPostResponse,
    },
  },
  mcp: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tools: [getPageContent, getPageField, getPostsContent, getPostsField, uploadImage] as any,
  },
})
