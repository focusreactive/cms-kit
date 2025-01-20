import { defineArrayMember } from 'sanity';
import { defineGlobalType } from '../defineGlobalType';

export const customRichText = defineGlobalType(() => ({
  name: 'customRichText',
  title: 'Custom Rich Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
    }),
  ],
}));
