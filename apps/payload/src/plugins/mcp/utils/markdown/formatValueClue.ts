import { isLexicalField } from '../lexical/isLexicalField'

export function formatRelationValueClue(
  value: Record<string, unknown>,
  knownCollectionPascals?: Set<string>,
): string {
  const title = value.title ?? value.name ?? value.id
  const collName = String(value.name ?? value.id)
  const hasCollectionTool = !knownCollectionPascals || knownCollectionPascals.has(collName)

  if (!hasCollectionTool) {
    return `[${String(title)}] no MCP tool available to fetch full content`
  }

  return `[${String(title)}] (id: ${String(value.id)}) -> call get${collName}Content for full content`
}

export function formatFieldValueClue(
  value: unknown,
  collectionPascal: string,
  fieldPath: string,
  knownCollectionPascals?: Set<string>,
): string {
  const detail = isLexicalField(value) ? 'rich text' : 'content'
  const hasFieldTool = !knownCollectionPascals || knownCollectionPascals.has(collectionPascal)

  if (!hasFieldTool) {
    return `[${fieldPath}] no MCP tool available to fetch full ${detail}`
  }

  return `[${fieldPath}] (fieldPath: "${fieldPath}") -> call get${collectionPascal}Field for full ${detail}`
}
