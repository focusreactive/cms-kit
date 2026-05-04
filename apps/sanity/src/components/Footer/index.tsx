import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { Footer as FooterUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import { prepareRichTextProps } from "@/lib/adapters/prepareRichTextProps";

import type { IFooterProps } from "./types";

export default function Footer({ data }: IFooterProps) {
  if (!data) return null;

  const { links, text, copywriteText, image } = data;

  if ((!links || links.length === 0) && !image && !copywriteText && !text)
    return <EmptyBlock name="Footer" />;

  return (
      <FooterUI
        image={prepareImageProps(image)}
        copywriteText={copywriteText}
        links={links?.map(prepareLinkProps) || []}
        text={prepareRichTextProps(text)}
      />
  );
}
