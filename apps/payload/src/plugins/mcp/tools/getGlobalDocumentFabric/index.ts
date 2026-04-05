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
    description: `Fetch the ${slug} global. Returns all top-level fields as structured sections with nested values rendered inline. The response is pre-formatted Markdown — output it verbatim without reformatting or summarizing. Pass full: true to expand all nested fields, arrays, rich text, and relations inline (uses depth 2). Produces a larger response.`,
    parameters: {
      locale: z
        .string()
        .optional()
        .describe('Locale code, e.g. "en" or "es". Omit to use the default locale.'),
      full: z
        .boolean()
        .optional()
        .describe(
          `Pass full: true to expand all nested fields, arrays, rich text, and relations inline (uses depth 2). Produces a larger response. Skip it if the user doesn't explicitly ask to extract the entire content.`,
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
    description: `Fetch the full content of a specific field from the ${slug} global. Use dot-notation for nested paths (e.g. "siteName", "blog.blogTitle"). Rich text fields are returned as Markdown.`,
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
