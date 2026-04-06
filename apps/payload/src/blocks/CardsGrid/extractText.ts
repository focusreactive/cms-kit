import type { CardsGridBlock } from '@/payload-types'
import { joinText } from '@/core/utils/text'

function extractLinkLabel(value: unknown): string {
  if (!value || typeof value !== 'object') return ''
  const label = (value as { label?: string | null }).label
  return typeof label === 'string' ? label : ''
}

export function extractCardsGridText(block: CardsGridBlock): string {
  return joinText(
    (block.items ?? []).flatMap((item) => [
      item.title,
      item.description,
      extractLinkLabel(item.link),
    ]),
  )
}
