import type { ImageStoryblok } from "@/generated/extracted-types";
import {
  ImageAspectRatio,
  type IImageProps,
} from "@shared/ui/components/ui/image/types";

export const prepareImageProps = (props?: ImageStoryblok): IImageProps => {
  if (!props) {
    return {
      src: "",
      alt: "",
      aspectRatio: ImageAspectRatio["16/9"],
      fill: true,
      fit: "cover",
    };
  }

  return {
    src: props.asset.filename || "",
    alt: props.asset.alt || "",
    aspectRatio: props.aspectRatio as ImageAspectRatio,
    fill: true,
    fit: "cover",
    sizes: "(max-width: 1280px) 100vw, 1280px",
  };
};
