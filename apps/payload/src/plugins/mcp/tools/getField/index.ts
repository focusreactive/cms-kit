import { z } from 'zod'
import type { CollectionSlug, GlobalSlug } from 'payload'
import type { Locale } from '@/core/types'
import type { BaseDocument, McpTool } from '../../types'
import type { McpToolsRegistry } from '../index'
import { resolvePath } from '../../utils/resolvePath'
import { buildCollectionFieldContent } from './buildCollectionFieldContent'
import { buildGlobalFieldContent } from './buildGlobalFieldContent'

export function createGetFieldTool(
  registry: McpToolsRegistry,
  knownCollections: Set<CollectionSlug>,
): McpTool {
  const knownCollectionSlugs = [...knownCollections].join(', ')
  const knownGlobalSlugs = Object.keys(registry.globals).join(', ')
  const allKnownSlugs = [knownCollectionSlugs, knownGlobalSlugs].filter(Boolean).join(', ')

  return {
    name: 'getField',
    description: `Fetch the full content of a specific field from a collection document or global. slug accepts a collection (${knownCollectionSlugs}) or a global (${knownGlobalSlugs}). For collections, id is required. For globals, id is ignored. Use dot-notation for nested paths (e.g. "content", "blocks.0", "meta.description"). Rich text fields are returned as Markdown by default. IMPORTANT: You MUST call this with raw: true before any create/update action targeting this field — the raw JSON (block IDs, Lexical nodes, existing array items) is required to construct a valid update payload. Never attempt an update without first reading the field with raw: true.`,
    parameters: {
      slug: z
        .string()
        .describe(
          `Collection or global slug. Collections: ${knownCollectionSlugs}. Globals: ${knownGlobalSlugs}.`,
        ),
      id: z
        .string()
        .optional()
        .describe('Document ID. Required when slug is a collection; ignored for globals.'),
      fieldPath: z
        .string()
        .describe('Dot-notation path to the field, e.g. "content" or "blocks.2"'),
      locale: z
        .string()
        .optional()
        .describe('Locale code, e.g. "en" or "es". Omit to use the default locale.'),
      raw: z
        .boolean()
        .optional()
        .describe(
          'REQUIRED before any update/create: returns raw JSON instead of Markdown, including block IDs, Lexical nodes, and full array structure needed to construct a valid update payload.',
        ),
    },
    handler: async (args, req) => {
      const { slug, id, fieldPath, locale, raw } = args as {
        slug: string
        id?: string
        fieldPath: string
        locale?: Locale
        raw?: boolean
      }

      const collectionConfig = registry.collections[slug as CollectionSlug]
      if (collectionConfig) {
        if (!id) {
          return {
            content: [
              {
                type: 'text',
                text: `Error: "id" is required when slug is a collection. "${slug}" is a collection slug.`,
              },
            ],
          }
        }

        const collection = slug as CollectionSlug

        const doc = (await req.payload.findByID({
          collection,
          id,
          overrideAccess: false,
          req,
          depth: 1,
          locale,
        })) as BaseDocument

        const resolved = resolvePath(doc, fieldPath)
        if ('error' in resolved) {
          return { content: [{ type: 'text', text: `Error: ${resolved.error}` }] }
        }

        const content = buildCollectionFieldContent({
          fieldPath,
          value: resolved.value,
          collection,
          documentId: id,
          payload: req.payload,
          raw,
        })

        return { content }
      }

      const globalConfig = registry.globals[slug as GlobalSlug]
      if (globalConfig) {
        const globalSlug = slug as GlobalSlug

        const doc = (await req.payload.findGlobal({
          slug: globalSlug,
          overrideAccess: false,
          req,
          depth: 1,
          locale,
        })) as BaseDocument

        const resolved = resolvePath(doc, fieldPath)
        if ('error' in resolved) {
          return { content: [{ type: 'text', text: `Error: ${resolved.error}` }] }
        }

        const content = buildGlobalFieldContent({
          fieldPath,
          value: resolved.value,
          slug: globalSlug,
          payload: req.payload,
          raw,
        })

        return { content }
      }

      return {
        content: [
          {
            type: 'text',
            text: `Error: unknown slug "${slug}". Known slugs: ${allKnownSlugs}`,
          },
        ],
      }
    },
  }
}
