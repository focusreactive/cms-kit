import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { Carousel as CarouselUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareRichTextProps } from "@/lib/adapters/prepareRichTextProps";
import SectionContainer from "@/components/SectionContainer";

import type { ICarouselProps } from "./types";

export default function Carousel({ blok }: ICarouselProps) {
  const { slides, effect, fullWidth, loop, slidesPerView } = blok;

  if (!slides || slides.length === 0)
    return <EmptyBlock name={blok.component as string} />;

  const carouselSlides = slides.map((slide) => ({
    image: prepareImageProps(slide.image[0]),
    text: prepareRichTextProps(slide.text?.[0]),
    effect,
  }));

  const carouselParams = {
    loop,
    slidesPerView: parseInt(slidesPerView),
    spaceBetween: 20,
  };

  return (
    <SectionContainer
      blok={{
        ...blok,
        paddingX: "none",
        noMaxWidth: fullWidth,
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
