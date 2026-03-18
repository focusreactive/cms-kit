import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { FaqBlock } from '@/payload-types'

function extractTextFromLexical(content: SerializedEditorState | null | undefined): string {
  if (!content?.root?.children) return ''

  const extractText = (node: unknown): string => {
    if (!node || typeof node !== 'object') return ''

    if ('text' in node && node.text && typeof node.text === 'string') {
      return node.text
    }

    if ('children' in node && node.children && Array.isArray(node.children)) {
      return node.children.map(extractText).join(' ').trim()
    }

    return ''
  }

  const text = content.root.children.map(extractText).join(' ').trim()
  return text
}

export function createFaqSchema(faq: FaqBlock) {
  if (!faq.items || faq.items.length === 0) {
    return null
  }

  const mainEntity = faq.items
    .filter(item => item.question && item.answer)
    .map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': extractTextFromLexical(item.answer),
      },
    }))

  if (mainEntity.length === 0) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': mainEntity,
  }
}
