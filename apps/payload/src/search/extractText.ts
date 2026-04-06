import type {
  CardsGridBlock,
  CarouselBlock,
  FaqBlock,
  HeroBlock,
  LinksListBlock,
  LogosBlock,
  Page,
  Post,
  Testimonial,
  TestimonialsListBlock,
} from '@/payload-types'

interface LexicalNode {
  text?: string
  children?: LexicalNode[]
}

type MaybeString = string | null | undefined

function joinText(parts: Array<MaybeString>) {
  return parts
    .filter((part): part is string => typeof part === 'string' && part.trim().length > 0)
    .map((part) => part.trim())
    .join(' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export function extractLexicalText(value: unknown) {
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

function extractLinkLabel(value: unknown) {
  if (!value || typeof value !== 'object') return ''

  const label = (value as { label?: string | null }).label

  return typeof label === 'string' ? label : ''
}

function extractHeroText(block: HeroBlock) {
  return joinText([
    block.title,
    extractLexicalText(block.richText),
    ...(block.actions?.map((action) => action.label) ?? []),
  ])
}

function extractFaqText(block: FaqBlock) {
  return joinText([
    block.heading,
    ...(block.items ?? []).flatMap((item) => [item.question, extractLexicalText(item.answer)]),
  ])
}

function extractTestimonialsText(block: TestimonialsListBlock) {
  const testimonialText = (block.testimonialItems ?? []).flatMap((item) => {
    if (!item?.testimonial || typeof item.testimonial === 'number') return []

    const testimonial = item.testimonial as Testimonial
    return [testimonial.author, testimonial.company, testimonial.position, testimonial.content]
  })

  return joinText([block.heading, block.subheading, ...testimonialText])
}

function extractCardsGridText(block: CardsGridBlock) {
  return joinText(
    (block.items ?? []).flatMap((item) => [
      item.title,
      item.description,
      extractLinkLabel(item.link),
    ]),
  )
}

function extractCarouselText(block: CarouselBlock) {
  return joinText([
    extractLexicalText(block.text),
    ...(block.slides ?? []).map((slide) => extractLexicalText(slide.text)),
  ])
}

function extractLogosText(block: LogosBlock) {
  return joinText((block.items ?? []).map((item) => item.link?.label))
}

function extractLinksListText(block: LinksListBlock) {
  return joinText((block.links ?? []).map((item) => item.link?.label))
}

function extractPageBlockText(block: Page['blocks'][number]) {
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

export function extractPageText(page: Pick<Page, 'title' | 'blocks'>) {
  return joinText([page.title, ...(page.blocks ?? []).map(extractPageBlockText)])
}

export function extractPostText(post: Pick<Post, 'title' | 'excerpt' | 'content'>) {
  return joinText([post.title, post.excerpt, extractLexicalText(post.content)])
}
