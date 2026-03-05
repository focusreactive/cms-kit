import React from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { AlignVariant, type IRichTextProps } from '@shared/ui/components/ui/richText/types'
import { RichText } from '@/shared/ui'

export function prepareRichTextProps(
  content: SerializedEditorState | null | undefined,
  align: AlignVariant = AlignVariant.Left,
  removeInnerMargins = false,
): IRichTextProps {
  return {
    richText: content ? <RichText content={content} /> : null,
    alignVariant: align,
    removeInnerMargins,
  }
}
