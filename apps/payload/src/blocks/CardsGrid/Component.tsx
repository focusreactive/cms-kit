import React from 'react'
import type { CardsGridBlock } from '@/payload-types'
import { CardsGrid } from '@shared/ui'
import { SectionContainer } from '@/shared/ui'
import type { IDefaultCardProps } from '@shared/ui/components/sections/cardsGrid/types'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'

export const CardsGridBlockComponent: React.FC<CardsGridBlock> = ({ items, columns }) => {
  const cards: IDefaultCardProps[] = (items ?? []).map((item) => ({
    title: item.title,
    description: item.description ?? undefined,
    image: prepareImageProps(typeof item.image === 'object' ? item.image : null),
    link: prepareLinkProps(item.link),
    alignVariant: (item.alignVariant as IDefaultCardProps['alignVariant']) ?? 'center',
    rounded: (item.rounded as IDefaultCardProps['rounded']) ?? 'none',
    backgroundColor: (item.backgroundColor as IDefaultCardProps['backgroundColor']) ?? 'none',
  }))

  return (
    <SectionContainer>
      <CardsGrid items={cards} columns={columns ?? 3} />
    </SectionContainer>
  )
}
