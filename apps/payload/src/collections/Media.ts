import { anyone, author, or, superAdmin, user } from '@/shared/lib/access'
import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'
import { generateRichText } from '@/shared/lib/generateRichText'
import { DEFAULT_MEDIA_CACHE_TAG } from '@/shared/lib/getDefaultMediaId'

export const Media: CollectionConfig<'media'> = {
  slug: 'media',
  labels: {
    singular: {
      en: 'Media',
      es: 'Medio',
    },
    plural: {
      en: 'Media',
      es: 'Medios',
    },
  },
  access: {
    create: or(superAdmin, user, author),
    delete: or(superAdmin, user, author),
    read: anyone,
    update: or(superAdmin, user, author),
  },
  folders: true,
  admin: {
    pagination: {
      limits: [20, 50, 100],
    },
    defaultColumns: ['filename', 'alt'],
    group: 'Content',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: {
        en: 'Alt',
        es: 'Alt',
      },
      localized: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: generateRichText(),
      label: {
        en: 'Caption',
        es: 'Descripción',
      },
      localized: true,
    },
    {
      name: 'defaultFor',
      type: 'select',
      hasMany: true,
      options: [
        {
          value: 'platform_default',
          label: {
            en: 'Default image for the platform (logo, blocks, sections)',
            es: 'Imagen por defecto de la plataforma (logo, bloques, secciones)',
          },
        },
      ],
      admin: {
        description: {
          en: 'Use this file as default when no image is selected.',
          es: 'Usar este archivo por defecto cuando no se seleccione ninguna imagen.',
        },
      },
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    disableLocalStorage: process.env.NODE_ENV === 'production',
    staticDir: process.env.NODE_ENV === 'production' ? undefined : 'public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
  hooks: {
    afterChange: [
      () => {
        revalidateTag(DEFAULT_MEDIA_CACHE_TAG)
      },
    ],
    afterDelete: [
      () => {
        revalidateTag(DEFAULT_MEDIA_CACHE_TAG)
      },
    ],
  },
}
