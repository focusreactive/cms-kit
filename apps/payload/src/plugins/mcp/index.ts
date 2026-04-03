import type { Page } from '@/payload-types'
import type { MCPAccessSettings } from '@payloadcms/plugin-mcp'
import type { PayloadRequest } from 'payload'
import { buildUrl } from '@/core/utils/path/buildUrl'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { getDocumentFabric } from './tools/getDocumentFabric'
import { uploadImage } from './tools/uploadImage'
import { getAllDocumentsFabric } from './tools/getAllDocumentsFabric'

const LOCAL_DEV_MCP_USER: MCPAccessSettings['user'] = {
  id: 0,
  collection: 'users',
  email: 'local-mcp@localhost',
  name: 'Local MCP',
  role: 'admin',
  updatedAt: new Date(0).toISOString(),
  createdAt: new Date(0).toISOString(),
}

const LOCAL_HOSTS = ['127.0.0.1', '::1', 'localhost']

function isLocalDevMcpRequest(req: PayloadRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return false
  }

  if (process.env.PAYLOAD_MCP_LOCAL_AUTH_BYPASS === 'false') {
    return false
  }

  try {
    if (!req.url) {
      return false
    }

    const url = new URL(req.url)

    return LOCAL_HOSTS.includes(url.hostname)
  } catch {
    const host = req.headers.get('host')?.split(':')[0]

    if (!host) return false

    return LOCAL_HOSTS.includes(host)
  }
}

const KNOWN_COLLECTION_PASCALS = new Set(['Page', 'Posts', 'Header', 'Footer'])

// Get tools
const [getPageContent, getPageField] = getDocumentFabric({
  collection: 'page',
  titleField: 'title',
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
  knownCollectionPascals: KNOWN_COLLECTION_PASCALS,
})
const [getPostsContent, getPostsField] = getDocumentFabric({
  collection: 'posts',
  knownCollectionPascals: KNOWN_COLLECTION_PASCALS,
})
const [getHeaderContent, getHeaderField] = getDocumentFabric({
  collection: 'header',
  knownCollectionPascals: KNOWN_COLLECTION_PASCALS,
})
const [getFooterContent, getFooterField] = getDocumentFabric({
  collection: 'footer',
  knownCollectionPascals: KNOWN_COLLECTION_PASCALS,
})

export const mcpPluginConfig = mcpPlugin({
  collections: {
    page: {
      description:
        'Website pages built with a block-based layout system. Each page has a title, URL slug, nested hierarchy (parent/breadcrumbs), and a flexible block editor for composing content sections such as Hero, Content, FAQ, and more. Supports draft/publish versioning and localization (en/es). Use this collection to read, create, update or delete site pages.',
      enabled: true,
    },
    posts: {
      description:
        'Blog posts. Each post has a title, excerpt, hero image, rich-text body, SEO metadata, categories, authors, and related posts. Supports draft/publish versioning and localization (en/es). Use this collection to read, create, update or delete blog articles.',
      enabled: true,
    },
  },
  overrideAuth: async (req, getDefaultMcpAccessSettings) => {
    if (!isLocalDevMcpRequest(req)) {
      return getDefaultMcpAccessSettings()
    }

    return {
      user: LOCAL_DEV_MCP_USER,
      page: {
        create: true,
        delete: true,
        find: false,
        update: true,
      },
      posts: {
        create: true,
        delete: true,
        find: false,
        update: true,
      },

      'payload-mcp-tool': {
        getPageContent: true,
        getPageField: true,
        getAllPage: true,
        getPostsContent: true,
        getPostsField: true,
        getAllPosts: true,
        getHeaderContent: true,
        getHeaderField: true,
        getFooterContent: true,
        getFooterField: true,
        uploadImage: true,
      },
    }
  },
  mcp: {
    tools: [
      getPageContent,
      getPageField,
      getAllDocumentsFabric({
        collection: 'page',
        tableFields: ['id', 'title', 'slug', '_status'],
        titleField: 'title',
        buildUrl: (doc) =>
          buildUrl({
            collection: 'page',
            breadcrumbs: doc.breadcrumbs as Page['breadcrumbs'],
            locale: 'en',
          }),
      }),
      getPostsContent,
      getPostsField,
      getAllDocumentsFabric({
        collection: 'posts',
        tableFields: ['id', 'title', 'slug', '_status', 'publishedAt', 'excerpt'],
        titleField: 'title',
      }),
      getHeaderContent,
      getHeaderField,
      getFooterContent,
      getFooterField,
      uploadImage,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
})
