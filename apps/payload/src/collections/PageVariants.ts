import type { CollectionConfig } from 'payload'
import { tenantAdmin, anyone, author, or, superAdmin, user } from '@/shared/lib/access'
import { abTestingRulesFields } from '@/fields/abTestingRulesFields'
import { createBasePageFields } from './Page/basePageFields'

export const pageVariantsSlug = 'page-variants'

export const PageVariants: CollectionConfig = {
  slug: pageVariantsSlug,
  labels: {
    singular: { en: 'Page Variant', es: 'Variante de Página' },
    plural: { en: 'Page Variants', es: 'Variantes de Página' },
  },
  access: {
    read: anyone,
    create: or(superAdmin, tenantAdmin, user, author),
    update: or(superAdmin, tenantAdmin, user, author),
    delete: or(superAdmin, tenantAdmin, user, author),
  },
  admin: {
    useAsTitle: 'title',
    group: 'A/B Testing',
    defaultColumns: ['title', 'page', 'bucketID', 'updatedAt'],
    description: {
      en: 'Page variants for A/B testing. Each variant holds alternative content for a specific page.',
      es: 'Variantes de página para pruebas A/B. Cada variante contiene contenido alternativo para una página específica.',
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Content',
            es: 'Contenido',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              label: { en: 'Title', es: 'Título' },
              admin: {
                description: {
                  en: 'The title shown in the admin panel to identify this variant.',
                  es: 'El título mostrado en el panel de administración para identificar esta variante.',
                },
              },
            },
            ...createBasePageFields(),
          ],
        },
        {
          label: {
            en: 'A/B Testing General Settings',
            es: 'Configuración General de las Pruebas A / B',
          },
          fields: [
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'page',
              required: true,
              index: true,
              label: { en: 'Original Page', es: 'Página Original' },
              admin: {
                description: {
                  en: 'The page this variant belongs to.',
                  es: 'La página a la que pertenece esta variante.',
                },
              },
            },
            {
              name: 'bucketID',
              type: 'select',
              required: true,
              index: true,
              options: [
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b' },
                { label: 'C', value: 'c' },
              ],
              label: { en: 'Bucket ID', es: 'ID de Variante' },
              admin: {
                description: {
                  en: 'Variant identifier used in the URL and cookie. Each page can have at most one variant per bucket.',
                  es: 'Identificador de variante usado en la URL y cookie. Cada página puede tener como máximo una variante por bucket.',
                },
              },
            },
          ],
        },
        {
          name: 'abTestingRules',
          label: {
            en: 'A/B Testing Rules',
            es: 'Reglas de Pruebas A/B',
          },
          fields: abTestingRulesFields(),
        },
      ],
    },
  ],
}
