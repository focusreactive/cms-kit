import type { CollectionConfig } from 'payload'

import { superAdmin } from '@/core/lib/access'
import { isDev } from '@/core/utils/isDev'

export const DocumentEmbeddings: CollectionConfig = {
  slug: 'document-embeddings',
  labels: {
    singular: {
      en: 'Document Embedding',
      es: 'Incrustación de Documento',
    },
    plural: {
      en: 'Document Embeddings',
      es: 'Incrustaciones de Documentos',
    },
  },
  access: {
    create: superAdmin,
    read: superAdmin,
    update: superAdmin,
    delete: superAdmin,
  },
  admin: {
    hidden: !isDev(),
  },
  fields: [
    {
      name: 'documentId',
      type: 'text',
      required: true,
    },
    {
      name: 'collection',
      type: 'select',
      required: true,
      options: [
        { label: 'Page', value: 'page' },
        { label: 'Post', value: 'post' },
      ],
    },
    {
      name: 'locale',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: '',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      defaultValue: '',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      defaultValue: '',
    },
    {
      name: 'imageUrl',
      type: 'text',
    },
    {
      name: 'imageAlt',
      type: 'text',
    },
  ],
}
