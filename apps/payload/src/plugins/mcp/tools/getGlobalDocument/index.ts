import { z } from 'zod'
import type { GlobalSlug, PayloadRequest } from 'payload'
import type { Locale } from '@/core/types'
import type { BaseDocument, McpTool } from '../../types'
import type { McpToolsRegistry } from '../index'
import { buildContent } from './buildContent'

async function fetchGlobal(
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
  }) as Promise<BaseDocument>
}

export function createGetGlobalDocumentTool(
  registry: McpToolsRegistry,
  baseSkipKeys: Set<string>,
): McpTool {
  const knownSlugs = Object.keys(registry.globals).join(', ')

  return {
    name: 'getGlobalDocument',
    description: `Fetch a global document. Specify globalSlug (one of: ${knownSlugs}). Returns all top-level fields as a structured overview — complex fields (arrays, blocks, relations, rich text) are summarized with their type and item count. Use this to discover the global structure, then call getField to drill into specific fields. Also use before any update action to understand field structure and existing values. Do NOT pass full: true unless the user explicitly asks to extract the entire content. Pass raw: true to get the full raw JSON document (including all IDs and Lexical nodes) — required when you need data to reconstruct or pass back in an update. The response is pre-formatted Markdown — output it verbatim without reformatting or summarizing.`,
    parameters: {
      globalSlug: z.string().describe(`The global slug. One of: ${knownSlugs}`),
      locale: z
        .string()
        .optional()
        .describe('Locale code, e.g. "en" or "es". Omit to use the default locale.'),
      full: z
        .boolean()
        .optional()
        .describe(
          'Only pass full: true when the user explicitly asks to extract the entire global content. Expands all nested fields, arrays, rich text, and relations inline (uses depth 2). Produces a much larger response — omit by default.',
        ),
      raw: z
        .boolean()
        .optional()
        .describe(
          'Return the raw JSON document instead of formatted Markdown. Use this when you need all field IDs, Lexical node structure, or any data you will pass back in an update call.',
        ),
    },
    handler: async (args, req) => {
      const { globalSlug, locale, full, raw } = args as {
        globalSlug: string
        locale?: Locale
        full?: boolean
        raw?: boolean
      }

      const config = registry.globals[globalSlug as GlobalSlug]
      if (!config) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: unknown globalSlug "${globalSlug}". Known globals: ${knownSlugs}`,
            },
          ],
        }
      }

      const slug = globalSlug as GlobalSlug
      const effectiveSkipKeys = new Set([...baseSkipKeys, ...(config.skipKeys ?? [])])

      const doc = await fetchGlobal(slug, req, locale, full)

      const content = buildContent({
        doc,
        skipKeys: effectiveSkipKeys,
        slug,
        titleField: config.titleField,
        payload: req.payload,
        full,
        raw,
        locale,
      })

      return { content }
    },
  }
}
