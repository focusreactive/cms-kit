import type { IGenericCarouselBaseProps } from "../../ui/GenericCarousel/types";
import type { IImageProps } from "../../ui/image/types";
import { type IRichTextProps } from "../../ui/richText/types";

export interface ICarouselProps extends IGenericCarouselBaseProps {
  text?: IRichTextProps;
  slides: ICarouselCardProps[];
}

export interface ICarouselCardProps {
  image: IImageProps;
  text?: IRichTextProps;
  effect: IGenericCarouselBaseProps["effect"];
  isActive?: boolean;
}
