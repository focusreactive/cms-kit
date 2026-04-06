interface LexicalNode {
  text?: string
  children?: LexicalNode[]
}

export function extractLexicalText(value: unknown): string {
  if (!value || typeof value !== 'object') return ''

  const root = (value as { root?: LexicalNode }).root
  if (!root) return ''

  const visit = (node: LexicalNode): string => {
    if (typeof node.text === 'string') return node.text
    if (!node.children?.length) return ''
    return joinText(node.children.map(visit))
  }

  return visit(root)
}

export function joinText(parts: Array<string | null | undefined>): string {
  return parts
    .filter((part): part is string => typeof part === 'string' && part.trim().length > 0)
    .map((part) => part.trim())
    .join(' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}
