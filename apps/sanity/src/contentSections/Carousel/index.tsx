import { stegaClean } from "@sanity/client/stega";
import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { Carousel as CarouselUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareRichTextProps } from "@/lib/adapters/prepareRichTextProps";
import SectionContainer from "@/components/SectionContainer";

import type { ICarouselProps } from "./types";

export default function Carousel({ data }: ICarouselProps) {
  if (!data) return null;

  const { slides, loop, slidesPerView } = data;
  const effect = stegaClean(data.effect);

  if (!slides || slides.length === 0) return <EmptyBlock name="Carousel" />;

  const carouselSlides = slides.map((slide) => ({
    image: prepareImageProps(slide.image),
    text: prepareRichTextProps(slide.text),
    effect,
  }));

  const carouselParams = {
    loop,
    slidesPerView,
    spaceBetween: 20,
  };

  return (
    <SectionContainer
      sectionData={{
        ...data,
        paddingX: "none",
      }}
    >
      <CarouselUI
        slides={carouselSlides}
        effect={effect}
        params={carouselParams}
      />
    </SectionContainer>
  );
}
