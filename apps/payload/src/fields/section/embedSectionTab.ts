import { Field } from 'payload'
import { sectionFields } from './sectionFields'

export function embedSectionTab(contentFields: Field[]): Field[] {
  return [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Content',
            es: 'Contenido',
          },
          fields: contentFields,
        },
        {
          label: {
            en: 'Section',
            es: 'Sección',
          },
          fields: [sectionFields],
        },
      ],
    },
  ]
}
