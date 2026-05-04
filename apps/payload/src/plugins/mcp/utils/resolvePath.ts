import { isLexicalField } from './lexical/isLexicalField'
import { lexicalToMarkdown } from './lexical/lexicalToMarkdown'
import { BaseDocument } from '../types'

export function walkBlock(val: unknown): unknown {
  if (isLexicalField(val)) return lexicalToMarkdown(val.root)

  if (Array.isArray(val)) return val.map(walkBlock)

  if (typeof val === 'object' && val !== null) {
    return Object.fromEntries(
      Object.entries(val as Record<string, unknown>).map(([k, v]) => [k, walkBlock(v)]),
    )
  }

  return val
}

export function resolvePath(
  doc: BaseDocument,
  fieldPath: string,
): { value: unknown } | { error: string } {
  const segments = fieldPath.split('.')
  let current: unknown = doc

  for (const segment of segments) {
    if (current === null || current === undefined) {
      return { error: `Path "${fieldPath}": reached null/undefined before segment "${segment}"` }
    }

    if (Array.isArray(current)) {
      const index = parseInt(segment, 10)
      if (isNaN(index)) {
        return {
          error: `Path "${fieldPath}": expected numeric index at "${segment}", got non-number`,
        }
      }
      if (index < 0 || index >= current.length) {
        return {
          error: `Path "${fieldPath}": index ${index} out of bounds (array length ${current.length})`,
        }
      }
      current = current[index]
    } else if (typeof current === 'object') {
      const obj = current as Record<string, unknown>
      if (!(segment in obj)) {
        return { error: `Path "${fieldPath}": key "${segment}" not found` }
      }
      current = obj[segment]
    } else {
      return { error: `Path "${fieldPath}": cannot navigate into scalar at segment "${segment}"` }
    }
  }

  return { value: current }
}
