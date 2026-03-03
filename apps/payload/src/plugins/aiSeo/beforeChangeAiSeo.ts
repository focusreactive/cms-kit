import type { CollectionBeforeChangeHook, PayloadRequest } from 'payload'
import type { AiSeoPluginOptions, SeoFields } from './types'
import { generateSeoWithAi } from './generateSeoWithAi'
import { getValueByPath, setValueByPath, isEmpty } from './setValueByPath'
import { BaseLocalizationConfig } from 'payload'

const DEFAULT_CONTENT_FIELDS = ['title']
const DEFAULT_SEO_FIELDS: SeoFields = {
  title: 'meta.title',
  description: 'meta.description',
}

/**
 * Extract locale from request.
 * Priority: req.locale > searchParams > payload config default > 'en'
 */
function getLocaleFromRequest(req: PayloadRequest): string {
  // 1. Try req.locale (set by Payload for localized requests)
  if (req.locale) {
    return req.locale
  }

  // 2. Try searchParams (from admin UI)
  const searchLocale = req.searchParams?.get('locale')
  if (searchLocale) {
    return searchLocale
  }

  // 3. Try default from Payload config
  const defaultLocale = (req.payload.config.localization as BaseLocalizationConfig)?.defaultLocale
  if (defaultLocale) {
    return defaultLocale
  }

  // 4. Fallback to 'en'
  return 'en'
}

/**
 * Extract value from a potentially localized field.
 * If the value is an object with locale keys, returns the value for the specified locale (or default).
 */
function getLocalizedValue(value: unknown, locale: string, defaultLocale: string): unknown {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) {
    return value
  }

  const obj = value as Record<string, unknown>

  // Check if this looks like a localized object by checking if it has string keys that match locale pattern
  // Typically locales are 2-letter codes like 'en', 'es', 'fr', etc.
  const keys = Object.keys(obj)
  const hasLocaleKeys = keys.length > 0 && keys.every((key) => /^[a-z]{2}(-[A-Z]{2})?$/.test(key))

  if (!hasLocaleKeys) {
    return value
  }

  console.log(`[aiSeo] Detected localized field with locales:`, keys)

  // Try to get value for the requested locale
  if (locale in obj) {
    console.log(`[aiSeo] Using locale: ${locale}`)
    return obj[locale]
  }

  // Fallback to default locale
  if (defaultLocale in obj) {
    console.log(`[aiSeo] Falling back to default locale: ${defaultLocale}`)
    return obj[defaultLocale]
  }

  // Return first available value
  const firstKey = keys[0]
  console.log(`[aiSeo] Using first available locale: ${firstKey}`)
  return obj[firstKey]
}

function resolvePageTitle(data: Record<string, unknown>): string {
  const title = data.title
  if (typeof title === 'string' && title.trim()) return title.trim()
  if (title != null && typeof title === 'object' && !Array.isArray(title)) {
    const obj = title as Record<string, unknown>
    const first = Object.values(obj).find((v) => typeof v === 'string' && (v as string).trim())
    return typeof first === 'string' ? first.trim() : 'Page'
  }
  return 'Page'
}

/**
 * Extract text content from Lexical node recursively.
 */
function extractLexicalText(node: unknown): string {
  if (!node || typeof node !== 'object') {
    return ''
  }

  const obj = node as Record<string, unknown>
  const parts: string[] = []

  // Handle text nodes
  if (obj.type === 'text' && typeof obj.text === 'string') {
    return obj.text
  }

  // Handle nodes with children
  if (Array.isArray(obj.children)) {
    for (const child of obj.children) {
      const text = extractLexicalText(child)
      if (text) {
        parts.push(text)
      }
    }
  }

  return parts.join(' ')
}

/**
 * Extract text content from a value (handles strings, objects, arrays, blocks, richText).
 */
function extractTextContent(
  value: unknown,
  locale: string,
  defaultLocale: string,
  depth = 0,
): string {
  // Prevent infinite recursion
  if (depth > 10) {
    return ''
  }

  if (value == null) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => extractTextContent(item, locale, defaultLocale, depth + 1))
      .filter(Boolean)
      .join('\n')
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>

    // Handle Lexical editor format (Payload CMS richText)
    if ('root' in obj && obj.root != null) {
      return extractLexicalText(obj.root)
    }

    // Handle direct children array (alternative format)
    if ('children' in obj && Array.isArray(obj.children)) {
      return extractLexicalText(obj)
    }

    // Handle block types with specific text fields
    if ('blockType' in obj || 'type' in obj) {
      const textFields = ['text', 'content', 'heading', 'label', 'title']
      for (const field of textFields) {
        if (field in obj && obj[field]) {
          const text = extractTextContent(obj[field], locale, defaultLocale, depth + 1)
          if (text) {
            return text
          }
        }
      }
    }

    // Check if this might be a localized field (has locale keys like 'en', 'es')
    const localizedValue = getLocalizedValue(obj, locale, defaultLocale)
    if (localizedValue !== obj) {
      // This was a localized field, extract from the resolved value
      return extractTextContent(localizedValue, locale, defaultLocale, depth + 1)
    }

    // Extract text from all values in the object
    const texts = Object.entries(obj)
      .filter(([key]) => !key.startsWith('_') && key !== 'id') // Skip meta fields
      .map(([, val]) => extractTextContent(val, locale, defaultLocale, depth + 1))
      .filter(Boolean)

    return texts.join(' ')
  }

  return ''
}

/**
 * Build page content from specified field paths.
 */
function buildPageContent(
  data: Record<string, unknown>,
  contentFields: string[],
  locale: string,
  defaultLocale: string,
  collectionSlug?: string,
): string {
  console.log(`[aiSeo] Building content for collection: ${collectionSlug}`)
  console.log(`[aiSeo] Using locale: ${locale}, default: ${defaultLocale}`)
  console.log(`[aiSeo] Content fields to extract:`, contentFields)

  const contentParts: string[] = []

  for (const path of contentFields) {
    const value = getValueByPath(data, path)
    console.log(`[aiSeo] Field "${path}":`, {
      exists: value != null,
      type: Array.isArray(value) ? 'array' : typeof value,
      arrayLength: Array.isArray(value) ? value.length : undefined,
      hasRoot: value != null && typeof value === 'object' && 'root' in value,
      hasChildren: value != null && typeof value === 'object' && 'children' in value,
    })

    if (value != null) {
      const text = extractTextContent(value, locale, defaultLocale).trim()
      if (text) {
        const preview = text.length > 100 ? text.slice(0, 100) + '...' : text
        console.log(`[aiSeo] Extracted ${text.length} chars from "${path}":`, preview)
        contentParts.push(text)
      } else {
        console.log(`[aiSeo] No text extracted from "${path}"`)
      }
    } else {
      console.log(`[aiSeo] Field "${path}" is null/undefined`)
    }
  }

  const fullContent = contentParts.join('\n\n')
  console.log(`[aiSeo] Total content length: ${fullContent.length} characters`)

  return fullContent
}

export function createBeforeChangeAiSeo(
  options: AiSeoPluginOptions,
  collectionSlug?: string,
): CollectionBeforeChangeHook {
  const { apiKey, seoFields, contentFields = DEFAULT_CONTENT_FIELDS, model } = options

  // Use seoFields if provided, otherwise use default
  const targetFields = seoFields ?? DEFAULT_SEO_FIELDS

  return async function beforeChangeAiSeo({ data, operation, collection, req }) {
    console.log(
      `[aiSeo] Hook triggered for collection: ${collection?.slug ?? collectionSlug}, operation: ${operation}`,
    )

    if (operation !== 'create') {
      console.log(`[aiSeo] Skipping - operation is "${operation}", not "create"`)
      return data
    }

    const rawData = data as Record<string, unknown>

    // Check if SEO fields need filling
    const titleEmpty = isEmpty(getValueByPath(rawData, targetFields.title))
    const descriptionEmpty = isEmpty(getValueByPath(rawData, targetFields.description))

    console.log(`[aiSeo] SEO fields:`, targetFields)
    console.log(`[aiSeo] Title field "${targetFields.title}" is empty:`, titleEmpty)
    console.log(
      `[aiSeo] Description field "${targetFields.description}" is empty:`,
      descriptionEmpty,
    )

    const needsFill = titleEmpty || descriptionEmpty
    if (!needsFill) {
      console.log(`[aiSeo] All SEO fields already filled, skipping AI generation`)
      return data
    }

    // Get locale from request
    const locale = getLocaleFromRequest(req)
    const defaultLocale =
      (req.payload.config.localization as BaseLocalizationConfig)?.defaultLocale ?? 'en'

    console.log(`[aiSeo] Request locale: ${locale}, default: ${defaultLocale}`)

    const pageTitle = resolvePageTitle(rawData)
    console.log(`[aiSeo] Page title:`, pageTitle)

    const pageContent = buildPageContent(
      rawData,
      contentFields,
      locale,
      defaultLocale,
      collection?.slug ?? collectionSlug,
    )
    const result = await generateSeoWithAi({ pageTitle, pageContent, apiKey, model })

    if (!result) {
      console.error(`[aiSeo] AI generation failed, skipping`)
      return data
    }

    console.log(`[aiSeo] AI generated:`, result)

    // Set title if empty
    if (titleEmpty) {
      console.log(`[aiSeo] Setting "${targetFields.title}" to:`, result.title)
      setValueByPath(rawData, targetFields.title, result.title)
    }

    // Set description if empty
    if (descriptionEmpty) {
      console.log(`[aiSeo] Setting "${targetFields.description}" to:`, result.description)
      setValueByPath(rawData, targetFields.description, result.description)
    }

    console.log(`[aiSeo] Successfully filled SEO fields`)
    return data
  }
}
