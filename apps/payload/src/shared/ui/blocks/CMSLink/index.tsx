import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import type { Page, Post } from '@/payload-types'
import { cn } from '@/shared/lib/utils'
import { Button, ButtonVariant, ButtonSize, Link } from '@/shared/ui'
import { BLOG_CONFIG } from '@/shared/config/blog'

type ButtonProps = React.ComponentProps<typeof Button>

const linkVariants = cva('transition-all', {
  variants: {
    appearance: {
      inline: 'text-primary underline-offset-4',
      link: 'text-primary underline-offset-4 hover:underline',
    },
  },
  defaultVariants: {
    appearance: 'inline',
  },
})

const collectionPaths: Record<string, string> = {
  posts: BLOG_CONFIG.basePath,
  page: '',
}

// Legacy shadcn variants from Payload CMS field definitions
type LegacyAppearance = 'default' | 'outline'

type Props = {
  appearance?: VariantProps<typeof linkVariants>['appearance'] | ButtonProps['variant'] | LegacyAppearance | null
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  onClick?: React.MouseEventHandler<HTMLElement>
  reference?: {
    relationTo: 'page' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

function mapAppearanceToVariant(appearance: Props['appearance']): ButtonProps['variant'] {
  if (appearance === 'default') return ButtonVariant.Primary
  if (appearance === 'outline') return ButtonVariant.Secondary
  return appearance as ButtonProps['variant']
}

export const CMSLink: React.FC<Props> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    onClick,
    reference,
    size: size,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${collectionPaths[reference.relationTo]}/${reference.value.slug}`
      : url

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const isInline = appearance === 'link' || appearance === 'inline' || !appearance

  const hrefToUse = (href || url) === '/home' ? '/' : href || url || ''

  /* Ensure we don't break any styles set by richText */
  if (isInline) {
    const linkAppearance = appearance === 'link' ? 'link' : 'inline'
    return (
      <Link
        className={cn(linkVariants({ appearance: linkAppearance }), className)}
        href={hrefToUse}
        onClick={onClick}
        {...newTabProps}
      >
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button
      asChild
      className={className}
      size={size}
      variant={mapAppearanceToVariant(appearance)}
    >
      <Link href={href || url || ''} onClick={onClick} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
