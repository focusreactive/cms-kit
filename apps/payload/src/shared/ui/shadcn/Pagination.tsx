'use client'

import { cn } from '@/shared/lib/utils'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'
import { useTranslations } from 'next-intl'
import { ButtonProps, buttonVariants } from './Button'

const Root = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    role="navigation"
    {...props}
  />
)

const Content: React.FC<
  { ref?: React.Ref<HTMLUListElement> } & React.HTMLAttributes<HTMLUListElement>
> = ({ className, ref, ...props }) => (
  <ul className={cn('flex flex-row items-center gap-1', className)} ref={ref} {...props} />
)

const Item: React.FC<
  { ref?: React.Ref<HTMLLIElement> } & React.HTMLAttributes<HTMLLIElement>
> = ({ className, ref, ...props }) => <li className={cn('', className)} ref={ref} {...props} />

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'button'>

const Link = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <button
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        size,
        variant: isActive ? 'outline' : 'ghost',
      }),
      className,
    )}
    {...props}
  />
)

const Previous = ({
  className,
  ...props
}: React.ComponentProps<typeof Link>) => {
  const t = useTranslations('pagination')
  
  return (
    <Link
      aria-label={t('goToPreviousPage')}
      className={cn('gap-1 pl-2.5', className)}
      size="default"
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>{t('previous')}</span>
    </Link>
  )
}

const Next = ({ className, ...props }: React.ComponentProps<typeof Link>) => {
  const t = useTranslations('pagination')
  
  return (
    <Link
      aria-label={t('goToNextPage')}
      className={cn('gap-1 pr-2.5', className)}
      size="default"
      {...props}
    >
      <span>{t('next')}</span>
      <ChevronRight className="h-4 w-4" />
    </Link>
  )
}

const Ellipsis = ({ className, ...props }: React.ComponentProps<'span'>) => {
  const t = useTranslations('pagination')
  
  return (
    <span
      aria-hidden
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">{t('morePages')}</span>
    </span>
  )
}

export {
  Root,
  Content,
  Ellipsis,
  Item,
  Link,
  Next,
  Previous,
}
