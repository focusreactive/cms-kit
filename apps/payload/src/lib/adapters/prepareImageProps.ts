import type { Media } from '@/payload-types'
import { ImageAspectRatio, type IImageProps } from '@shared/ui/components/ui/image/types'

export interface ImageFieldData {
  image?: Media | number | null
  aspectRatio?: ImageAspectRatio | string | null
}

const validRatios = Object.values(ImageAspectRatio) as string[]

function resolveAspectRatio(raw: ImageAspectRatio | string | null | undefined): ImageAspectRatio {
  return validRatios.includes(raw ?? '') ? (raw as ImageAspectRatio) : ImageAspectRatio['1/1']
}

export function prepareImageProps(data: ImageFieldData | null | undefined): IImageProps {
  const media = data?.image
  const aspectRatio = resolveAspectRatio(data?.aspectRatio)

  if (!media || typeof media !== 'object') {
    return {
      src: '',
      alt: '',
      aspectRatio,
      fill: true,
      fit: 'cover',
    }
  }

  return {
    src: media.url ?? '',
    alt: media.alt ?? '',
    aspectRatio,
    fill: true,
    fit: 'cover',
    sizes: '(max-width: 1280px) 100vw, 1280px',
  }
}
