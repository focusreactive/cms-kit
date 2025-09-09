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
    // TO-DO: add style fields to RichText: removeInnerMargins
    //     removeInnerMargins: props.removeInnerMargins and alignVariant
    // alignVariant: props.alignVariant as AlignVariant,
    removeInnerMargins: false,
    alignVariant: AlignVariant.Center,
  };
};
