import type {
  AutoplayOptions,
  NavigationOptions,
  SwiperModule,
} from "swiper/types";

import { type IRichTextProps } from "../richText/types";

export interface IGenericCarouselBaseProps {
  customModules?: SwiperModule[];
  customModulesParams?: {
    navigation?: NavigationOptions;
    autoplay?: AutoplayOptions;
  };
  effect?: "slide" | "fade" | "cube" | "flip" | "coverflow" | "cards";
  params?: {
    loop?: boolean;
    slidesPerView?: "auto" | number;
    spaceBetween?: number;
  };
}

export interface IGenericCarouselProps extends IGenericCarouselBaseProps {
  slides: {
    children: React.ReactNode;
    className?: string;
  }[];
  text?: IRichTextProps;
}
