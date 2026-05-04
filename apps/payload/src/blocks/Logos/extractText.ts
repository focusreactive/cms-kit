import type { LogosBlock } from '@/payload-types'
import { joinText } from '@/core/utils/text'

export function extractLogosText(block: LogosBlock): string {
  return joinText((block.items ?? []).map((item) => item.link?.label))
}
