import { isLexicalField } from '../lexical/isLexicalField'

export function formatRelationValueClue(
  value: Record<string, unknown>,
  knownCollectionSlug?: string,
): string {
  const title = value.title ?? value.name ?? value.id
  const relationTo = (value.relationTo as string | undefined) || knownCollectionSlug
  const id = String(value.id)

  if (relationTo) {
    return `[${String(title)}] getDocument(collectionSlug: "${relationTo}", id: "${id}")`
  }

  return `[${String(title)}] no MCP tool available to fetch full document`
}

export function formatFieldValueClue(
  value: unknown,
  fieldPath: string,
  collectionSlug: string,
  documentId?: string,
): string {
  if (documentId) {
    return `[${fieldPath}] getField(slug: "${collectionSlug}", id: "${documentId}", fieldPath: "${fieldPath}")`
  }

  const detail = isLexicalField(value) ? 'rich text' : 'content'

  return `[${fieldPath}] no MCP tool available to fetch full ${detail}`
}
