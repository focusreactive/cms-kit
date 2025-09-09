import {
  AlignVariant,
  type IRichTextProps,
} from "@shared/ui/components/ui/richText/types";

import renderRichText from "../renderRichText";

export const prepareRichTextProps = (props?: any): IRichTextProps => {
  if (!props) {
    return {
      richText: null,
      removeInnerMargins: false,
      alignVariant: AlignVariant.Left,
    };
  }

  return {
    richText: renderRichText({ data: props }),
    //     removeInnerMargins: props.removeInnerMargins,
    // alignVariant: props.alignVariant as AlignVariant,
    removeInnerMargins: false,
    alignVariant: AlignVariant.Center,
  };
};
