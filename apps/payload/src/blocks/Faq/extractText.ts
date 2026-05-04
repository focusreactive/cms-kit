import type { FaqBlock } from '@/payload-types'
import { extractLexicalText, joinText } from '@/core/utils/text'

export function extractFaqText(block: FaqBlock): string {
  return joinText([
    block.heading,
    ...(block.items ?? []).flatMap((item) => [item.question, extractLexicalText(item.answer)]),
  ])
}
