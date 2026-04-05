import type { LinksListInlineBlock } from '@/payload-types'
import { LinksList } from '@shared/ui'
import { AlignVariant } from '@shared/ui/components/sections/linksList/types'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'
import { resolveLocale } from '@/core/lib/resolveLocale'

export async function LinksListInlineComponent({ links, alignVariant }: LinksListInlineBlock) {
  const locale = await resolveLocale()

  return (
    <LinksList
      links={(links ?? []).map((item) => prepareLinkProps(item.link, locale))}
      alignVariant={(alignVariant as AlignVariant) ?? AlignVariant.Left}
    />
  )
}
