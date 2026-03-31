import { resolvePath } from './resolvePath'

export function resolveTitleField(doc: Record<string, unknown>, titleField?: string) {
  const fallback = doc.id !== undefined ? String(doc.id) : 'Document'

  if (!titleField) return fallback

  const result = resolvePath(doc, titleField)
  if ('error' in result) return fallback

  const { value } = result
  if (value === null || value === undefined || typeof value === 'object') return fallback

  return String(value)
}
