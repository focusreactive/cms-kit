import type { OpenAIChatModelId } from '@ai-sdk/openai/internal'

export type { OpenAIChatModelId }

/** SEO fields mapping - specifies where to write AI-generated SEO data. */
export interface SeoFields {
  /** Path where to write the generated title (e.g. 'meta.title', 'seo.metaTitle', 'test1'). */
  title: string
  /** Path where to write the generated description (e.g. 'meta.description', 'seo.metaDesc', 'test2'). */
  description: string
}

/** Configuration for a single collection. */
export interface CollectionConfig {
  /** Collection slug (e.g. 'page'). */
  collection: string
  /**
   * SEO fields mapping.
   * Explicitly specifies where to write title and description.
   * Example: { title: 'meta.title', description: 'meta.description' }
   * Or with custom field names: { title: 'test1', description: 'test2' }
   */
  seoFields?: SeoFields
  /**
   * Field paths to extract content from for AI analysis (e.g. ['title', 'content', 'excerpt']).
   * If not specified, only 'title' field will be used.
   * The AI will analyze all these fields to generate better SEO meta tags.
   */
  contentFields?: string[]
}

export interface AiSeoPluginOptions {
  /** Whether to enable the plugin. */
  enabled: boolean
  /** API key for the AI provider (e.g. OpenAI). Prefer passing from process.env. */
  apiKey: string
  /**
   * Collection(s) to attach the hook to. Can be:
   * - A single collection slug: 'page'
   * - An array of collection slugs: ['page', 'posts']
   * - An array of collection configs with custom fields:
   *   [{ collection: 'page', seoFields: { title: 'meta.title', description: 'meta.description' } }]
   */
  collections: string | string[] | CollectionConfig[]
  /**
   * Default SEO fields mapping.
   * Used when collections don't specify their own seoFields.
   * Example: { title: 'meta.title', description: 'meta.description' }
   */
  seoFields?: SeoFields
  /**
   * Default field paths to extract content from for AI analysis (e.g. ['title', 'content', 'excerpt']).
   * Used when collections are specified without individual contentFields config.
   * If not specified, only 'title' field will be used.
   */
  contentFields?: string[]
  /** OpenAI chat model for generateObject (e.g. 'gpt-4o-mini'). */
  model?: OpenAIChatModelId
}

export interface GenerateSeoInput {
  pageTitle: string
  /** Full page content for AI analysis. Can include body text, excerpts, etc. */
  pageContent?: string
  apiKey: string
  model?: OpenAIChatModelId
}

export interface GenerateSeoResult {
  title: string
  description: string
}
