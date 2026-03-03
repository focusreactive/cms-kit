import type { Field } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const generateSeoFields = (): Field[] => {
  return [
    OverviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
    }),
    MetaTitleField({
      hasGenerateFn: true,
    }),
    MetaImageField({
      relationTo: 'media',
    }),
    MetaDescriptionField({
      hasGenerateFn: true,
    }),
    PreviewField({
      hasGenerateFn: true,
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
    }),
    {
      name: 'robots',
      type: 'select',
      label: {
        en: 'Robots',
        es: 'Robots',
      },
      defaultValue: 'index',
      options: [
        {
          label: {
            en: 'Index',
            es: 'Index',
          }, value: 'index'
        },
        {
          label: {
            en: 'No Index',
            es: 'No Index',
          }, value: 'noindex'
        },
      ],
      admin: {
        description: {
          en: 'Allow search engines to index this page',
          es: 'Permite a los motores de búsqueda indexar esta página',
        },
      },
    },
  ]
}
