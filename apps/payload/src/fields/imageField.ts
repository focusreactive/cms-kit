import type { GroupField } from 'payload'
import { getDefaultMediaId } from '@/core/lib/getDefaultMediaId'
import { PLATFORM_DEFAULT_MEDIA_SLOT } from '@/core/constants/mediaDefaults'

const aspectRatioOptions = [
  { label: { en: '16/9', es: '16/9' }, value: '16/9' },
  { label: { en: '3/2', es: '3/2' }, value: '3/2' },
  { label: { en: '4/3', es: '4/3' }, value: '4/3' },
  { label: { en: '1/1', es: '1/1' }, value: '1/1' },
  { label: { en: '9/16', es: '9/16' }, value: '9/16' },
  { label: { en: '1/2', es: '1/2' }, value: '1/2' },
  { label: { en: '4/1', es: '4/1' }, value: '4/1' },
  { label: { en: '3/1', es: '3/1' }, value: '3/1' },
  { label: { en: 'Auto', es: 'Auto' }, value: 'auto' },
]

export function imageField(
  name = 'image',
  {
    withDefaultMedia = false,
    required = true,
  }: { withDefaultMedia?: boolean; required?: boolean } = {},
): GroupField {
  return {
    name,
    type: 'group',
    label: { en: 'Image', es: 'Imagen' },
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        required,
        label: { en: 'Image File', es: 'Archivo de imagen' },
        ...(withDefaultMedia
          ? { defaultValue: async () => getDefaultMediaId(PLATFORM_DEFAULT_MEDIA_SLOT) }
          : {}),
      },
      {
        name: 'aspectRatio',
        type: 'select',
        defaultValue: '1/1',
        label: { en: 'Aspect Ratio', es: 'Relación de aspecto' },
        options: aspectRatioOptions,
      },
    ],
  }
}
