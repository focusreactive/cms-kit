import React from 'react'
import type { CarouselBlock } from '@/payload-types'
import { Carousel } from '@shared/ui'
import { SectionContainer } from '@/core/ui'
import type { ICarouselCardProps } from '@shared/ui/components/sections/carousel/types'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareRichTextProps } from '@/lib/adapters/prepareRichTextProps'

export const CarouselBlockComponent: React.FC<CarouselBlock> = ({
  text,
  effect,
  slides,
  section,
  id,
}) => {
  const cards: ICarouselCardProps[] = (slides ?? []).map((slide) => ({
    image: prepareImageProps(slide.image),
    text: slide.text ? prepareRichTextProps(slide.text) : undefined,
    effect: (effect as ICarouselCardProps['effect']) ?? 'slide',
  }))

  return (
    <SectionContainer sectionData={{ ...section, id }}>
      <Carousel
        text={text ? prepareRichTextProps(text) : undefined}
        slides={cards}
        effect={(effect as ICarouselCardProps['effect']) ?? 'slide'}
      />
    </SectionContainer>
  )
}
