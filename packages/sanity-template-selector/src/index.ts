import { definePlugin } from 'sanity';
import { functionalTypes } from './functional-types/types';
import { createTemplateView } from './functional-types/contentBlockActions/schema';
import { ContentBlocksArg } from './types';
export { defineBlocksField } from './define-blocks-field';

export * from './types';

export const CMSKitContentBlocks = definePlugin<ContentBlocksArg>(
  ({ presets = [] }) => {
    const params = {
      presets,
    };
    return {
      name: 'content-blocks',
      // title: 'CMS-KIT Content Blocks',
      schema: {
        name: 'content-blocks',
        types: [...functionalTypes, createTemplateView(params)],
      },
    };
  },
);