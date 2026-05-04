import type { LexicalNode, SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

export function extractLexicalText(value: unknown): string {
  if (!value || typeof value !== 'object') return ''
  if (!(value as { root?: LexicalNode }).root) return ''

  return convertLexicalToPlaintext({ data: value as SerializedEditorState })
}

export function joinText(parts: Array<string | null | undefined>): string {
  return parts
    .filter((part): part is string => typeof part === 'string' && part.trim().length > 0)
    .map((part) => part.trim())
    .join(' ')
}
