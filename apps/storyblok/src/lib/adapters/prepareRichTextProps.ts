import type { RichTextStoryblok } from "@/generated/extracted-types";
import {
  AlignVariant,
  type IRichTextProps,
} from "@shared/ui/components/ui/richText/types";

import renderRichText from "../renderRichText";

export const prepareRichTextProps = (
  props?: RichTextStoryblok,
): IRichTextProps => {
  if (!props) {
    return {
      richText: null,
      removeInnerMargins: false,
      alignVariant: AlignVariant.Left,
    };
  }

  return {
    richText: renderRichText(props.content),
    removeInnerMargins: props.removeInnerMargins,
    alignVariant: props.alignVariant as AlignVariant,
  };
};
