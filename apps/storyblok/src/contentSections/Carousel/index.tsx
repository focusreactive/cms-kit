import { storyblokEditable } from "@storyblok/react/rsc";

import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { Carousel as CarouselUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareRichTextProps } from "@/lib/adapters/prepareRichTextProps";
import SectionContainer from "@/components/SectionContainer";

import type { ICarouselProps } from "./types";

export default function Carousel({ blok }: ICarouselProps) {
  const { slides, effect, loop, slidesPerView, section, _uid } = blok;

  if (!slides || slides.length === 0)
    return <EmptyBlock name={blok.component as string} />;

  const resolvedEffect = (effect || "slide") as Exclude<typeof effect, "">;

  const carouselSlides = slides.map((slide) => ({
    image: prepareImageProps(slide.image[0]),
    text: prepareRichTextProps(slide.text?.[0]),
    effect: resolvedEffect,
  }));

  const carouselParams = {
    loop,
    slidesPerView: parseInt(slidesPerView),
    spaceBetween: 20,
  };

  return (
    <SectionContainer
      sectionData={section?.[0]}
      id={_uid}
      editableAttrs={storyblokEditable(blok)}
    >
      <CarouselUI
        slides={carouselSlides}
        effect={resolvedEffect}
        params={carouselParams}
      />
    </SectionContainer>
  );
}
