import React from 'react'

import type { HeroBlock } from '@/payload-types'
import { Media, RichText, Section, Container, HeroOverlay } from '@/shared/ui'
import { HeroActions } from './HeroActions'

type Props = HeroBlock

export const HeroBlockComponent: React.FC<Props> = ({
  actions,
  media,
  richText,
  opacity,
  enabled,
  color,
}) => {
  return (
    <Section
      className="relative flex items-center justify-center min-h-[80vh] text-white p-0"
      data-theme="dark"
    >
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 select-none">
          <Media fill imgClassName="object-cover" priority loading="eager" resource={media} />
        </div>
      )}

      <Container className="relative z-10 flex items-center justify-center flex-col text-center">
        {richText && <RichText content={richText} className="mb-6" />}
        {Array.isArray(actions) && actions.length > 0 && (
          <HeroActions actions={actions} />
        )}
      </Container>

      <HeroOverlay enabled={enabled} opacity={opacity} color={color} />
    </Section>
  )
}
