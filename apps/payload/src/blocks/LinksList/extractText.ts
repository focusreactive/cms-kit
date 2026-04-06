import type { LinksListBlock } from '@/payload-types'
import { joinText } from '@/core/utils/text'

export function extractLinksListText(block: LinksListBlock): string {
  return joinText((block.links ?? []).map((item) => item.link?.label))
}
