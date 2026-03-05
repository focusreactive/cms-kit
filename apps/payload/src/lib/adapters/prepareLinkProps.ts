import type { LinkProps } from '@shared/ui/components/ui/link/types'
import { ButtonVariant } from '@shared/ui/components/ui/button/types'

type PayloadLink = {
  type?: 'reference' | 'custom' | null
  url?: string | null
  reference?: {
    relationTo: string
    value: unknown
  } | null
  label?: string | null
  appearance?: string | null
  newTab?: boolean | null
}

export function prepareLinkProps(link: PayloadLink | null | undefined): LinkProps {
  if (!link) return { text: '', href: '' }

  let href = ''

  if (link.type === 'custom' && link.url) {
    href = link.url
  } else if (link.type === 'reference' && link.reference) {
    const value = link.reference.value as Record<string, unknown>
    if (typeof value === 'object' && value !== null) {
      const breadcrumbs = (value.breadcrumbs as Array<{ url?: string }>) ?? []
      href = breadcrumbs[breadcrumbs.length - 1]?.url ?? (value.slug as string) ?? ''
    }
  }

  const variantMap: Record<string, ButtonVariant> = {
    outline: ButtonVariant.Secondary,
  }

  return {
    text: link.label ?? '',
    href,
    variant: variantMap[link.appearance ?? ''] ?? ButtonVariant.Default,
  }
}
