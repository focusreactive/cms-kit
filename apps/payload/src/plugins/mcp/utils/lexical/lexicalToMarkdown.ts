import { LexicalNode } from '../../types/lexical'

export function lexicalToMarkdown(node: LexicalNode): string {
  const { type, children = [] } = node
  const childText = () => children.map(lexicalToMarkdown).join('')

  switch (type) {
    case 'root':
      return childText()
    case 'paragraph':
      return childText() + '\n\n'
    case 'heading': {
      const tag = node.tag ?? 'h1'
      const level = parseInt(tag.replace('h', ''), 10) || 1

      return '#'.repeat(level) + ' ' + childText() + '\n\n'
    }
    case 'text': {
      let text = node.text ?? ''
      const format = node.format ?? 0

      if (format & 1) text = `**${text}**`
      if (format & 2) text = `_${text}_`
      if (format & 16) text = `\`${text}\``

      return text
    }
    case 'link': {
      const url = node.url ?? '#'

      return `[${childText()}](${url})`
    }
    case 'list': {
      const ordered = node.listType === 'number'

      return (
        children
          .map((child, i) => {
            const prefix = ordered ? `${i + 1}. ` : '- '

            return prefix + lexicalToMarkdown(child)
          })
          .join('\n') + '\n\n'
      )
    }
    case 'listitem':
      return childText()
    case 'quote':
      return '> ' + childText() + '\n\n'
    case 'code':
      return `\`\`\`\n${childText()}\n\`\`\`\n\n`
    default:
      return childText()
  }
}
