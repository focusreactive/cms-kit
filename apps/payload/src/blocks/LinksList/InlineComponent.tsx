import type { LinksListInlineBlock } from '@/payload-types'
import { LinksList } from '@shared/ui'
import { AlignVariant } from '@shared/ui/components/sections/linksList/types'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'

export const LinksListInlineComponent: React.FC<LinksListInlineBlock> = ({
  links,
  alignVariant,
}) => {
  return (
    <LinksList
      links={(links ?? []).map((item) => prepareLinkProps(item.link))}
      alignVariant={(alignVariant as AlignVariant) ?? AlignVariant.Left}
    />
  )
}
