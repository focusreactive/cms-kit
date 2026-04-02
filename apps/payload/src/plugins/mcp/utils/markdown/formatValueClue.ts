import { isLexicalField } from '../lexical/isLexicalField'

export function formatRelationValueClue(value: Record<string, unknown>): string {
  const title = value.title ?? value.name ?? value.id
  const collName = String(value.name ?? value.id)

  return `[${String(title)}] (id: ${String(value.id)}) -> call get${collName}Content for full content`
}

export function formatFieldValueClue(
  value: unknown,
  collectionPascal: string,
  fieldPath: string,
): string {
  const detail = isLexicalField(value) ? 'rich text' : 'content'

  return `[${fieldPath}] (fieldPath: "${fieldPath}") -> call get${collectionPascal}Field for full ${detail}`
}
