import type { CollectionConfig } from 'payload'

import { superAdmin } from '@/core/lib/access'

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
  admin: {
    group: 'System',
  },
  access: {
    create: superAdmin,
    read: superAdmin,
    update: superAdmin,
    delete: superAdmin,
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
  ],
}
