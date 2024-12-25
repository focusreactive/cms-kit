import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { Hero } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import { prepareRichTextProps } from "@/lib/adapters/prepareRichTextProps";
import SectionContainer from "@/components/SectionContainer";

import type { IHeroSectionProps } from "./types";

export default function HeroSection({ data }: IHeroSectionProps) {
  if (!data) return null;

  const { title, text, image, links, globalData } = data;

  if (!title && !text?.text && !image?.image && (!links || links.length === 0))
    return <EmptyBlock name="Hero Section" />;

  if (globalData) {
    const {
      title: globalTitle,
      text: globalText,
      image: globalImage,
      links: globalLinks,
    } = globalData as any;

    return (
      <SectionContainer sectionData={globalData as any}>
        <Hero
          title={globalTitle}
          text={prepareRichTextProps(globalText)}
          image={prepareImageProps(globalImage)}
          links={globalLinks?.map(prepareLinkProps) || []}
        />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer sectionData={data}>
      <Hero
        title={title}
        text={prepareRichTextProps(text)}
        image={prepareImageProps(image)}
        links={links?.map(prepareLinkProps) || []}
      />
    </SectionContainer>
  );
}
