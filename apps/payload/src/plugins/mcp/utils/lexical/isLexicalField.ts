import { LexicalNode } from "../../types/lexical";

export function isLexicalField(value: unknown): value is { root: LexicalNode } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'root' in value &&
    typeof (value as Record<string, unknown>).root === 'object' &&
    (value as Record<string, unknown>).root !== null
  )
}
