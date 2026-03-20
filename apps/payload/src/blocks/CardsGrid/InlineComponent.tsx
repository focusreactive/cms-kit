import type { CardsGridInlineBlock } from '@/payload-types'
import { CardsGrid } from '@shared/ui'
import type { IDefaultCardProps } from '@shared/ui/components/sections/cardsGrid/types'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'

export const CardsGridInlineComponent: React.FC<CardsGridInlineBlock> = ({ items, columns }) => {
  const cards: IDefaultCardProps[] = (items ?? []).map((item) => ({
    title: item.title,
    description: item.description ?? undefined,
    image: prepareImageProps(item.image ?? null),
    link: prepareLinkProps(item.link),
    alignVariant: (item.alignVariant as IDefaultCardProps['alignVariant']) ?? 'center',
    rounded: (item.rounded as IDefaultCardProps['rounded']) ?? 'none',
    backgroundColor: (item.backgroundColor as IDefaultCardProps['backgroundColor']) ?? 'none',
  }))

  return <CardsGrid items={cards} columns={columns ?? 3} />
}
