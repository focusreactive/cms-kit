import type { Field } from 'payload'
import { ContentBlock } from '@/blocks/Content/config'
import { TextSectionBlock } from '@/blocks/TextSection/config'
import { FaqBlock } from '@/blocks/Faq/config'
import { HeroBlock } from '@/blocks/Hero/config'
import { TestimonialsListBlock } from '@/blocks/TestimonialsList/config'
import { CardsGridBlock } from '@/blocks/CardsGrid/config'
import { CarouselBlock } from '@/blocks/Carousel/config'
import { LogosBlock } from '@/blocks/Logos/config'
import { LinksListBlock } from '@/blocks/LinksList/config'
import { generateSeoFields } from '@/core/lib/seoFields'
import { getBlocksFieldWithPresetsPath } from '@focus-reactive/payload-plugin-presets'

export function createBasePageFields({ withBlocksDefaultValue = false } = {}): Field[] {
  return [
    {
      name: 'header',
      type: 'relationship',
      relationTo: 'header',
      admin: {
        description: {
          en: 'The header to display on the page',
          es: 'El header a mostrar en la página',
        },
      },
    },
    {
      name: 'footer',
      type: 'relationship',
      relationTo: 'footer',
      admin: {
        description: {
          en: 'The footer to display on the page',
          es: 'El footer a mostrar en la página',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: { en: 'Content', es: 'Contenido' },
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              blocks: [HeroBlock, TextSectionBlock, ContentBlock, FaqBlock, TestimonialsListBlock, CardsGridBlock, CarouselBlock, LogosBlock, LinksListBlock],
              required: true,
              admin: {
                initCollapsed: false,
                components: {
                  Field: getBlocksFieldWithPresetsPath(),
                },
              },
              localized: true,
              ...(withBlocksDefaultValue && {
                defaultValue: () =>
                  ['hero', 'textSection', 'content', 'testimonialsList', 'faq'].map(
                    (blockType) => ({ blockType }),
                  ),
              }),
            },
          ],
        },
        {
          name: 'meta',
          label: { en: 'SEO', es: 'SEO' },
          fields: generateSeoFields(),
          localized: true,
        },
      ],
    },
  ]
}
