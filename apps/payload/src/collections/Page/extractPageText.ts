import type { Page } from '@/payload-types'
import { extractLexicalText, joinText } from '@/core/utils/text'
import { extractCardsGridText } from '@/blocks/CardsGrid/extractText'
import { extractCarouselText } from '@/blocks/Carousel/extractText'
import { extractFaqText } from '@/blocks/Faq/extractText'
import { extractHeroText } from '@/blocks/Hero/extractText'
import { extractLinksListText } from '@/blocks/LinksList/extractText'
import { extractLogosText } from '@/blocks/Logos/extractText'
import { extractTestimonialsText } from '@/blocks/TestimonialsList/extractText'

export function extractPageBlockText(block: Page['blocks'][number]): string {
  switch (block.blockType) {
    case 'hero':
      return extractHeroText(block)
    case 'textSection':
      return extractLexicalText(block.text)
    case 'content':
      return joinText([block.heading, extractLexicalText(block.content)])
    case 'faq':
      return extractFaqText(block)
    case 'testimonialsList':
      return extractTestimonialsText(block)
    case 'cardsGrid':
      return extractCardsGridText(block)
    case 'carousel':
      return extractCarouselText(block)
    case 'logos':
      return extractLogosText(block)
    case 'linksList':
      return extractLinksListText(block)
    default:
      return ''
  }
}

export function extractPageText(page: Pick<Page, 'title' | 'blocks'>): string {
  return joinText([page.title, ...(page.blocks ?? []).map(extractPageBlockText)])
}
