import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { Hero as HeroUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import { prepareRichTextProps } from "@/lib/adapters/prepareRichTextProps";
import { useGlobalComponentData } from "@/lib/hooks/useGlobalComponentData";
import SectionContainer from "@/components/SectionContainer";

import type { IHeroProps } from "./types";

export default function Hero({ blok }: IHeroProps) {
  const { title, text, image, links, globalData } = blok;
  const globalBlok = useGlobalComponentData(globalData as string);

  if (image.length === 0 && links.length === 0 && text?.length === 0 && !title)
    return <EmptyBlock name={blok.component as string} />;

  if (globalBlok) {
    const {
      title: globalTitle,
      text: globalText,
      image: globalImage,
      links: globalLinks,
    } = globalBlok.content;

    return (
      <SectionContainer blok={{ blok: globalBlok }}>
        <HeroUI
          title={globalTitle || ""}
          text={prepareRichTextProps(globalText?.[0])}
          image={prepareImageProps(globalImage[0])}
          links={globalLinks.map(prepareLinkProps)}
        />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer blok={blok}>
      <HeroUI
        title={title || ""}
        text={prepareRichTextProps(text?.[0])}
        image={prepareImageProps(image[0])}
        links={links.map(prepareLinkProps)}
      />
    </SectionContainer>
  );
}
