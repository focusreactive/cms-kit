import React from 'react'
import type { FaqBlock } from '@/payload-types'
import { createFaqSchema } from '@/shared/seo/schemas'
import { JsonLd } from '../JsonLd'

interface FaqJsonLdProps {
  faq: FaqBlock
}

export function FaqJsonLd({ faq }: FaqJsonLdProps) {
  const structuredData = createFaqSchema(faq)

  if (!structuredData) {
    return null
  }

  return <JsonLd data={structuredData} />
}
