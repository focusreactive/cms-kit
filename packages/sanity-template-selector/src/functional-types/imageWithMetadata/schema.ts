import { ImageIcon } from '@sanity/icons';
import { defineGlobalType } from '../defineGlobalType';
import { ImageInput } from './ImageInput';

export const imageWithMetadata = defineGlobalType(() => ({
  name: 'imageWithMetadata',
  type: 'image',
  title: 'Image',
  description: `Please add the metadata you want to use in the frontend.`,
  icon: ImageIcon,
  options: {
    hotspot: true,
    metadata: ['blurhash', 'lqip', 'palette'],
    requiredFields: [],
  },
  components: {
    input: ImageInput,
  },
  // preview: {
  //   prepare() {
  //     return {
  //       title: 'Image',
  //       // TODO: check why it's not global type
  //       type: 'tw-base.imageWithMetadata',
  //     };
  //   },
  // },
}));