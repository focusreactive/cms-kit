import type { CollectionSlug, GlobalSlug } from 'payload'
import type { BaseDocument, McpTool } from '../types'
import type { Locale } from '@/core/types'
import { createGetDocumentTool } from './getDocument'
import { createGetAllDocumentsTool } from './getAllDocuments'
import { createGetGlobalDocumentTool } from './getGlobalDocument'
import { createGetFieldTool } from './getField'

export const SKIP_KEYS = new Set([
  'blockType',
  'blockName',
  'url',
  'locale',
  'createdAt',
  'updatedAt',
])

export interface CollectionToolConfig {
  tableFields: string[]
  titleField?: string
  skipKeys?: string[]
  buildUrl?: (doc: BaseDocument, locale?: Locale) => string | null
}

export interface GlobalToolConfig {
  titleField?: string
  skipKeys?: string[]
}

export interface McpToolsRegistry {
  collections: Partial<Record<CollectionSlug, CollectionToolConfig>>
  globals: Partial<Record<GlobalSlug, GlobalToolConfig>>
}

export function createMcpTools(registry: McpToolsRegistry): McpTool[] {
  const knownCollections = new Set(Object.keys(registry.collections) as CollectionSlug[])

  return [
    createGetDocumentTool(registry, knownCollections, SKIP_KEYS),
    createGetAllDocumentsTool(registry, knownCollections),
    createGetGlobalDocumentTool(registry, SKIP_KEYS),
    createGetFieldTool(registry, knownCollections),
  ]
}
