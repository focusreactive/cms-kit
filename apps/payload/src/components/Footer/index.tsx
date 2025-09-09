import type { Footer } from "@/generated/payload-types";
import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { Footer as FooterUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import { prepareRichTextProps } from "@/lib/adapters/prepareRichTextProps";
import { getCachedGlobal } from "@/lib/utilities/getGlobals";
import SectionContainer from "@/components/SectionContainer";

export default async function Footer() {
  const footerData: Footer = await getCachedGlobal("footer", 1)();
  console.log("footerData===========>", footerData);
  const { links, text, copywriteText, image } = footerData;

  if ((!links || links.length === 0) && !image && !copywriteText && !text)
    return <EmptyBlock name="Footer" />;

  return (
    <SectionContainer
      block={{ ...footerData, theme: "dark", marginBottom: "none" }}
      className="rounded-b-none"
    >
      <FooterUI
        image={prepareImageProps(image)}
        copywriteText={copywriteText ?? ""}
        links={links?.map(prepareLinkProps) || []}
        text={prepareRichTextProps(text)}
      />
    </SectionContainer>
  );
}
