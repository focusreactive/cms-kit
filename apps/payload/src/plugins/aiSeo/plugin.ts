import type { Config, Plugin } from 'payload'
import type { AiSeoPluginOptions, CollectionConfig } from './types'
import { createBeforeChangeAiSeo } from './beforeChangeAiSeo'

/** Normalize collections config to a standard array format. */
function normalizeCollections(
  collections: string | string[] | CollectionConfig[],
): CollectionConfig[] {
  // Single string: 'page' → [{ collection: 'page' }]
  if (typeof collections === 'string') {
    return [{ collection: collections }]
  }

  // Array of strings: ['page', 'posts'] → [{ collection: 'page' }, ...]
  if (Array.isArray(collections) && collections.every((c) => typeof c === 'string')) {
    return (collections as string[]).map((collection) => ({
      collection,
    }))
  }

  // Array of configs: already in correct format
  if (Array.isArray(collections)) {
    return collections as CollectionConfig[]
  }

  return []
}

export function aiSeoPlugin(options: AiSeoPluginOptions): Plugin {
  const {
    apiKey,
    collections,
    seoFields: defaultSeoFields,
    contentFields: defaultContentFields,
  } = options

  if (!options.enabled) {
    console.log('[aiSeo] Plugin disabled')
    return (config: Config) => config
  }

  if (!apiKey?.trim()) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[aiSeo] Plugin skipped: apiKey is empty. Set OPENAI_API_KEY to enable AI SEO fill.',
      )
    }
    return (config: Config) => config
  }

  const collectionConfigs = normalizeCollections(collections)

  // Create a map of collection slug → hook
  const hooksByCollection = new Map(
    collectionConfigs.map((collectionConfig) => {
      const hook = createBeforeChangeAiSeo(
        {
          ...options,
          seoFields: collectionConfig.seoFields ?? defaultSeoFields,
          contentFields: collectionConfig.contentFields ?? defaultContentFields,
        },
        collectionConfig.collection,
      )
      return [collectionConfig.collection, hook]
    }),
  )

  return (config: Config): Config => {
    const updatedCollections = config.collections?.map((col) => {
      const hook = hooksByCollection.get(col.slug)
      if (!hook) {
        return col
      }

      const existingBeforeChange = col.hooks?.beforeChange ?? []
      return {
        ...col,
        hooks: {
          ...col.hooks,
          beforeChange: [...existingBeforeChange, hook],
        },
      }
    })

    return {
      ...config,
      collections: updatedCollections ?? config.collections,
    }
  }
}
