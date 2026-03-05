import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature,
  ParagraphFeature,
  UnorderedListFeature,
  OrderedListFeature,
  IndentFeature,
  AlignFeature,
  FeatureProviderServer,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import { BLOG_CONFIG } from '@/shared/config/blog'

export type RichTextPreset = 'default' | 'hero'

const toolbarFeatures = [FixedToolbarFeature(), InlineToolbarFeature()]

export function generateRichText(preset: RichTextPreset = 'default') {
  return lexicalEditor({
    features: ({ rootFeatures }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let defaultFeatures: FeatureProviderServer<any, any, any>[] = []

      switch (preset) {
        case 'hero':
          defaultFeatures = [
            ...toolbarFeatures,
            HeadingFeature(),
            ParagraphFeature(),
            BoldFeature(),
            UnderlineFeature(),
            StrikethroughFeature(),
            ItalicFeature(),
            ParagraphFeature(),
            SubscriptFeature(),
            SuperscriptFeature(),
            InlineCodeFeature(),
            UnorderedListFeature(),
            OrderedListFeature(),
            IndentFeature(),
            AlignFeature(),
          ]
          break
        case 'default':
          defaultFeatures = [
            ...toolbarFeatures,
            ...rootFeatures,
            LinkFeature({
              fields: ({ defaultFields }) => [
                ...defaultFields,
                {
                  name: 'rel',
                  type: 'select',
                  options: ['noopener', 'noreferrer', 'nofollow'],
                },
              ],
              enabledCollections: ['page', BLOG_CONFIG.collection],
              maxDepth: 2,
            }),
          ]
          break
        default:
          const _: never = preset
          throw new Error('Invalid preset')
      }

      return [...toolbarFeatures, ...defaultFeatures]
    },
  })
}
