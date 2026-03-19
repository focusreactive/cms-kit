import type { LogosInlineBlock } from '@/payload-types'
import { Logos } from '@shared/ui'
import { AlignVariant } from '@shared/ui/components/sections/logos/types'
import type { ILogoItem } from '@shared/ui/components/sections/logos/types'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'

export const LogosInlineComponent: React.FC<LogosInlineBlock> = ({ items, alignVariant }) => {
  const logoItems: ILogoItem[] = (items ?? []).map((item) => ({
    image: prepareImageProps(item.image),
    link: item.link ? prepareLinkProps(item.link) : undefined,
  }))

  return (
    <Logos items={logoItems} alignVariant={(alignVariant as AlignVariant) ?? AlignVariant.Center} />
  )
}
