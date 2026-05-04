import type { CarouselBlock } from '@/payload-types'
import { extractLexicalText, joinText } from '@/core/utils/text'

export function extractCarouselText(block: CarouselBlock): string {
  return joinText([
    extractLexicalText(block.text),
    ...(block.slides ?? []).map((slide) => extractLexicalText(slide.text)),
  ])
}
