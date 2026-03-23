import React from 'react'
import type { CardsGridBlock } from '@/payload-types'
import { CardsGrid } from '@shared/ui'
import { SectionContainer } from '@/core/ui'
import type { IDefaultCardProps } from '@shared/ui/components/sections/cardsGrid/types'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'
import { resolveLocale } from '@/core/lib/resolveLocale'

export async function CardsGridBlockComponent({
  items,
  columns,
  section,
  id,
}: CardsGridBlock) {
  const locale = await resolveLocale()

  const cards: IDefaultCardProps[] = (items ?? []).map((item) => ({
    title: item.title,
    description: item.description ?? undefined,
    image: prepareImageProps(item.image ?? null),
    link: prepareLinkProps(item.link, locale),
    alignVariant: (item.alignVariant as IDefaultCardProps['alignVariant']) ?? 'center',
    rounded: (item.rounded as IDefaultCardProps['rounded']) ?? 'none',
    backgroundColor: (item.backgroundColor as IDefaultCardProps['backgroundColor']) ?? 'none',
  }))

  return (
    <SectionContainer sectionData={{ ...section, id }}>
      <CardsGrid items={cards} columns={columns ?? 3} />
    </SectionContainer>
  )
}
