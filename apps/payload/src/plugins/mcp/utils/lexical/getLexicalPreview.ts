import { LexicalNode } from '../../types/lexical'
import { lexicalToPlainText } from './lexicalToPlainText'

export function getLexicalPreview(root: LexicalNode) {
  const children = root.children ?? []

  for (const child of children) {
    if (child.type === 'heading') {
      const text = lexicalToPlainText(child).trim()

      if (text) return text.slice(0, 100)
    }
  }

  for (const child of children) {
    if (child.type === 'paragraph') {
      const text = lexicalToPlainText(child).trim()

      if (text) return text.slice(0, 100)
    }
  }

  return null
}
