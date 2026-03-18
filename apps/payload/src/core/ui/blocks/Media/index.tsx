import React, { Fragment } from 'react'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'

import type { StaticImageData } from 'next/image'
import type { ElementType, Ref } from 'react'

import type { Media as MediaType } from '@/payload-types'

export interface MediaProps {
  alt?: string
  className?: string
  fill?: boolean // for NextImage only
  htmlElement?: ElementType | null
  pictureClassName?: string
  imgClassName?: string
  onClick?: () => void
  onLoad?: () => void
  loading?: 'lazy' | 'eager' // for NextImage only
  priority?: boolean // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>
  resource?: MediaType | string | number | null // for Payload media
  preferredSize?: keyof NonNullable<MediaType['sizes']> | undefined
  size?: string // for NextImage only
  src?: StaticImageData // for static media
  videoClassName?: string
}

export const Media: React.FC<MediaProps> = (props) => {
  const { className, htmlElement = 'div', resource } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
          className,
        }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  )
}
