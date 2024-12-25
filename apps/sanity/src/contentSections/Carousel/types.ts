import { type SectionCarousel } from "@/generated/extracted-types";

export interface ICarouselProps {
  data: SectionCarousel & {
    _key: string;
  };
}
