import type { HeroBlock } from '@/payload-types'
import { extractLexicalText, joinText } from '@/core/utils/text'

export function extractHeroText(block: HeroBlock): string {
  return joinText([
    block.title,
    extractLexicalText(block.richText),
    ...(block.actions?.map((action) => action.label) ?? []),
  ])
}
