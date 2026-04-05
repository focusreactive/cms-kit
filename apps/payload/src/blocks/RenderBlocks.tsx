import React, { Fragment } from 'react'
import { FaqBlockComponent } from './Faq/Component'
import { ContentBlockComponent } from './Content/Component'
import { TextSectionBlockComponent } from './TextSection/Component'
import { HeroBlockComponent } from './Hero/Component'
import { Page } from '@/payload-types'
import { TestimonialsListBlockComponent } from './TestimonialsList/Component'
import { CardsGridBlockComponent } from './CardsGrid/Component'
import { CarouselBlockComponent } from './Carousel/Component'
import { LogosBlockComponent } from './Logos/Component'
import { LinksListBlockComponent } from './LinksList/Component'

const blockComponents = {
  hero: HeroBlockComponent,
  textSection: TextSectionBlockComponent,
  faq: FaqBlockComponent,
  content: ContentBlockComponent,
  testimonialsList: TestimonialsListBlockComponent,
  cardsGrid: CardsGridBlockComponent,
  carousel: CarouselBlockComponent,
  logos: LogosBlockComponent,
  linksList: LinksListBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['blocks'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
