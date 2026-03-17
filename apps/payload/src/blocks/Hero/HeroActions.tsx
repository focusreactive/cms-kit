'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import {
  resolveAbCookieNames,
  useABConversion,
} from '@focus-reactive/payload-plugin-ab/analytics/client'

import type { HeroBlock } from '@/payload-types'
import { CMSLink } from '@/shared/ui'
import { manifestKeyToExpId } from '@/shared/lib/abTesting/cookieName'
import { abCookies } from '@/shared/lib/abTesting/abCookies'

type Action = NonNullable<HeroBlock['actions']>[number]

export function HeroActions({ actions }: { actions: Action[] }) {
  const { locale, slug } = useParams<{
    locale?: string
    slug?: string[]
  }>()

  const slugPath = Array.isArray(slug) && slug.length ? '/' + slug.join('/') : ''
  const experimentId = locale ? manifestKeyToExpId(`/${locale}${slugPath}`) : ''
  const cookieNames = resolveAbCookieNames(abCookies, experimentId)

  const trackConversion = useABConversion({ experimentId, ...cookieNames })

  return (
    <ul className="flex gap-4 flex-wrap">
      {actions.map((action, i) => (
        <li key={i}>
          <CMSLink {...action} onClick={() => trackConversion({ goalId: 'hero_cta_click' })} />
        </li>
      ))}
    </ul>
  )
}
