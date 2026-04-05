import { z } from 'zod'
import type { GlobalSlug, CollectionSlug, PayloadRequest } from 'payload'
import { Locale } from '@/core/types'
import { resolvePath } from '../../utils/resolvePath'
import { buildContent } from './buildContent'
import { buildFieldContent } from './buildFieldContent'
import { toPascalCase } from '../../utils/toPascalCase'
import { BaseDocument, McpTool } from '../../types'

const SKIP_KEYS = new Set(['blockType', 'blockName', 'url', 'locale', 'createdAt', 'updatedAt'])

export interface GlobalDocumentFabricOptions {
  slug: GlobalSlug
  titleField?: string
  skipKeys?: string[]
  knownCollections?: Set<CollectionSlug>
}

async function getGlobal(
  slug: GlobalSlug,
  req: PayloadRequest,
  locale?: Locale,
  full?: boolean,
): Promise<BaseDocument> {
  return req.payload.findGlobal({
    slug,
    overrideAccess: false,
    req,
    depth: full ? 2 : 1,
    locale,
  }) as unknown as Promise<BaseDocument>
}

export function getGlobalDocumentFabric({
  slug,
  titleField,
  skipKeys,
  knownCollections,
}: GlobalDocumentFabricOptions): [McpTool, McpTool] {
  const globalPascal = toPascalCase(slug)
  const knownCollectionPascals = knownCollections
    ? new Set([...knownCollections].map(toPascalCase))
    : undefined

  const effectiveSkipKeys = new Set([...SKIP_KEYS, ...(skipKeys ?? [])])

  const contentTool: McpTool = {
    name: `get${globalPascal}Content`,
    description: `Fetch the ${slug} global. Returns all top-level fields as a structured overview - complex fields (arrays, blocks, relations, rich text) are summarized with their type and item count rather than expanded. Use this to discover the global structure before deciding which fields to read. To read specific field values, call \`get${globalPascal}Field\` with the relevant dot-notation path. The response is pre-formatted Markdown - output it verbatim without reformatting or summarizing. Do NOT pass full: true unless the user explicitly asks to extract the entire content.`,
    parameters: {
      locale: z
        .string()
        .optional()
        .describe('Locale code, e.g. "en" or "es". Omit to use the default locale.'),
      full: z
        .boolean()
        .optional()
        .describe(
          `Only pass full: true when the user explicitly asks to extract the entire global content. Expands all nested fields, arrays, rich text, and relations inline (uses depth 2). Produces a much larger response - omit by default.`,
        ),
    },
    handler: async (args, req) => {
      const { locale, full } = args as {
        locale?: Locale
        full?: boolean
      }

      const doc = await getGlobal(slug, req, locale, full)

      const content = buildContent({
        doc,
        skipKeys: effectiveSkipKeys,
        globalPascal,
        slug,
        titleField,
        payload: req.payload,
        knownCollectionPascals,
        full,
        locale,
      })

      return { content }
    },
  }

  const fieldTool: McpTool = {
    name: `get${globalPascal}Field`,
    description: `Fetch the full content of a specific field from the ${slug} global. Use this after \`get${globalPascal}Content\` to drill into a particular field - especially for arrays, blocks, rich text, or relations that were summarized in the overview. Use dot-notation for nested paths (e.g. "siteName", "blog.blogTitle"). Rich text fields are returned as Markdown.`,
    parameters: {
      fieldPath: z
        .string()
        .describe('Dot-notation path to the field, e.g. "siteName" or "blog.blogTitle"'),
      locale: z
        .string()
        .optional()
        .describe('Locale code, e.g. "en" or "es". Omit to use the default locale.'),
    },
    handler: async (args, req) => {
      const { fieldPath, locale } = args as {
        fieldPath: string
        locale?: Locale
      }

      const doc = await getGlobal(slug, req, locale)

      const resolved = resolvePath(doc, fieldPath)

      if ('error' in resolved) {
        return {
          content: [{ type: 'text' as const, text: `Error: ${resolved.error}` }],
        }
      }

      const content = buildFieldContent({
        fieldPath,
        value: resolved.value,
        slug,
        globalPascal,
        payload: req.payload,
        knownCollectionPascals,
      })

      return { content }
    },
  }

  return [contentTool, fieldTool]
}
