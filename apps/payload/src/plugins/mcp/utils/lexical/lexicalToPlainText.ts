import { LexicalNode } from '../../types/lexical'

export function lexicalToPlainText(node: LexicalNode): string {
  if (node.text) return node.text

  if (!node.children) return ''

  return node.children.map(lexicalToPlainText).join('')
}
