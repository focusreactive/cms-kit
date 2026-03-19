import { cn } from '@/core/lib/utils'
import React from 'react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/core/ui'
import Image from 'next/image'

type Props = {
  resource?: MediaType | null
  className?: string
  imgClassName?: string
  alt?: string
  priority?: boolean
  loading?: 'eager' | 'lazy'
}

export const Logo = ({
  resource,
  className,
  imgClassName,
  alt = 'Logo',
  priority = true,
  loading = 'eager',
}: Props) => {
  if (resource) {
    return (
      <Media
        resource={resource}
        imgClassName={cn('size-9 object-contain', imgClassName)}
        className={className}
        priority={true}
        loading={loading}
        size="(max-width: 768px) 150px, 200px"
      />
    )
  }

  return (
    <Image
      src="/logo-placeholder.webp"
      alt={alt}
      fetchPriority={priority ? 'high' : 'auto'}
      loading={loading}
      width={200}
      height={36}
      className={cn('size-9 object-contain', imgClassName, className)}
    />
  )
}
