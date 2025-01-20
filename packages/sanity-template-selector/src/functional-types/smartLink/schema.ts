import { defineField } from "sanity";
import { defineGlobalType } from "../defineGlobalType";

export const smartLink = defineGlobalType(() => ({
  name: 'SmartLink',
  type: 'object',
  title: 'Link',
  initialValue: {
    type: 'internal',
  },
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Link Type',
      options: {
        list: [
          { title: 'URL', value: 'url' },
          { title: 'Internal', value: 'internal' },
        ],
      },
    }),
    defineField({
      name: 'text',
      type: 'string',
      title: 'Link Text',
    }),
    defineField({
      name: 'href',
      type: 'string',
      title: 'Href',
      hidden: ({ parent }) => parent?.type === 'internal',
    }),
    defineField({
      name: 'target',
      type: 'string',
      title: 'Target',
      hidden: ({ parent }) => parent?.type === 'internal',
      options: {
        list: [
          { title: 'Self', value: '_self' },
          { title: 'Blank', value: '_blank' },
          { title: 'Parent', value: '_parent' },
          { title: 'Top', value: '_top' },
        ],
      },
    }),

    defineField({
      name: 'prefetch',
      type: 'boolean',
      title: 'Prefetch',
      hidden: ({ parent }) => parent?.type === 'url',
      description: 'Indicates if Next.js should prefetch the page',
    }),
  ],
}));