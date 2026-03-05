import type { Media } from '@/payload-types'
import { ImageAspectRatio, type IImageProps } from '@shared/ui/components/ui/image/types'

export function prepareImageProps(
  media: Media | number | null | undefined,
  aspectRatio: ImageAspectRatio = ImageAspectRatio['16/9'],
): IImageProps {
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
