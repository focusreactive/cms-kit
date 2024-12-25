import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { Footer as FooterUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import { prepareRichTextProps } from "@/lib/adapters/prepareRichTextProps";
import SectionContainer from "@/components/SectionContainer";

import type { IFooterProps } from "./types";

export default function Footer({ blok }: IFooterProps) {
  const { text, copywriteText, links, image } = blok;

  if (
    text?.length === 0 &&
    links.length === 0 &&
    image.length === 0 &&
    !copywriteText
  )
    return <EmptyBlock name={blok.component as string} />;

  return (
    <SectionContainer blok={blok}>
      <FooterUI
        image={prepareImageProps(image?.[0])}
        copywriteText={copywriteText}
        links={links?.map(prepareLinkProps) || []}
        text={prepareRichTextProps(text?.[0])}
      />
    </SectionContainer>
  );
}
