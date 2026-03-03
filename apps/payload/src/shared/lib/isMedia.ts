import { Media } from '@/payload-types'

export default function isMedia(image: number | Media | null | undefined): image is Media {
  return typeof image === 'object' && image !== null && 'url' in image
}
