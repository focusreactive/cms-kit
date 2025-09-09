import type { HeroBlock } from "@/generated/payload-types";
import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { Hero } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import { prepareRichTextProps } from "@/lib/adapters/prepareRichTextProps";
import SectionContainer from "@/components/SectionContainer";

export const HeroSection: React.FC<HeroBlock> = (data) => {
  if (!data) return null;

  const { title, text, image, links, globalData } = data;

  if (!title && !text?.text && !image && (!links || links.length === 0))
    return <EmptyBlock name="Hero Section" />;

  // TO-DO: finish globalData case
  // if (globalData) {
  //   const {
  //     title: globalTitle,
  //     text: globalText,
  //     image: globalImage,
  //     links: globalLinks,
  //   } = globalData as any;

  //   return (
  //     <SectionContainer block={globalData as any}>
  //       <Hero
  //         title={globalTitle}
  //         text={prepareRichTextProps(globalText)}
  //         image={prepareImageProps(globalImage)}
  //         links={globalLinks?.map(prepareLinkProps) || []}
  //       />
  //     </SectionContainer>
  //   );
  // }

  return (
    <SectionContainer block={data}>
      <Hero
        title={title ?? ""}
        text={prepareRichTextProps(text)}
        image={prepareImageProps(image)}
        links={links?.map(prepareLinkProps) || []}
      />
    </SectionContainer>
  );
};
