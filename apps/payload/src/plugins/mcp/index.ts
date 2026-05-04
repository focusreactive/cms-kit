import type { Page } from '@/payload-types'
import type { PayloadRequest } from 'payload'
import { buildUrl } from '@/core/utils/path/buildUrl'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { createMcpTools, type McpToolsRegistry } from './tools'
import { uploadImage } from './tools/uploadImage'
import { LOCAL_DEV_MCP_USER, LOCAL_HOSTS } from './constants/local'

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

const registry: McpToolsRegistry = {
  collections: {
    page: {
      tableFields: ['slug', '_status'],
      titleField: 'title',
      buildUrl: (doc, locale) =>
        buildUrl({
          collection: 'page',
          breadcrumbs: doc.breadcrumbs as Page['breadcrumbs'],
          locale: locale ?? 'en',
        }),
      skipKeys: [
        'id',
        'generateSlug',
        'parent',
        'folder',
        '_abPassPercentage',
        '_abVariantOf',
        '_abVariantPercentages',
      ],
    },
    posts: {
      tableFields: ['slug', '_status', 'publishedAt', 'excerpt'],
      titleField: 'title',
      buildUrl: (doc, locale) =>
        buildUrl({
          collection: 'posts',
          slug: doc?.slug as string,
          absolute: false,
          locale: locale ?? 'en',
        }),
      skipKeys: ['id'],
    },
    header: {
      tableFields: [],
      titleField: 'name',
      skipKeys: ['id'],
    },
    footer: {
      tableFields: [],
      titleField: 'name',
      skipKeys: ['id'],
    },
  },
  globals: {
    'site-settings': {
      titleField: 'siteName',
    },
  },
}

export const mcpPluginConfig = mcpPlugin({
  collections: {
    page: {
      description:
        'Website pages built with a block-based layout system. Each page has a title, URL slug, nested hierarchy (parent/breadcrumbs), and a flexible block editor for composing content sections such as Hero, Content, FAQ, and more. Supports draft/publish versioning and localization (en/es). Use this collection to read, create, update or delete site pages.',
      enabled: {
        create: true,
        delete: true,
        find: false,
        update: true,
      },
    },
    posts: {
      description:
        'Blog posts. Each post has a title, excerpt, hero image, rich-text body, SEO metadata, categories, authors, and related posts. Supports draft/publish versioning and localization (en/es). Use this collection to read, create, update or delete blog articles.',
      enabled: {
        create: true,
        delete: true,
        find: false,
        update: true,
      },
    },
    header: {
      description:
        'Site header configurations. Each header has a name, logo, and navigation items (up to 6 links). Supports draft/publish versioning and localization (en/es). Use this collection to read, create, update or delete site headers.',
      enabled: {
        create: true,
        delete: true,
        find: false,
        update: true,
      },
    },
    footer: {
      description:
        'Site footer configurations. Each footer has a name, logo, navigation links (up to 10), body text, and copyright text. Supports draft/publish versioning and localization (en/es). Use this collection to read, create, update or delete site footers.',
      enabled: {
        create: true,
        delete: true,
        find: false,
        update: true,
      },
    },
  },
  overrideAuth: async (req, getDefaultMcpAccessSettings) => {
    if (!isLocalDevMcpRequest(req)) {
      return getDefaultMcpAccessSettings()
    }

    return {
      user: LOCAL_DEV_MCP_USER,
      page: { create: true, delete: true, find: false, update: true },
      posts: { create: true, delete: true, find: false, update: true },
      header: { create: true, delete: true, find: false, update: true },
      footer: { create: true, delete: true, find: false, update: true },
      'payload-mcp-tool': {
        getDocument: true,
        getAllDocuments: true,
        getGlobalDocument: true,
        getField: true,
        uploadImage: true,
      },
    }
  },
  mcp: {
    tools: [
      ...createMcpTools(registry),
      uploadImage,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
})
