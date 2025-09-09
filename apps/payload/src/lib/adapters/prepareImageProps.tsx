import { Media } from "@/generated/payload-types";
import {
  ImageAspectRatio,
  type IImageProps,
} from "@shared/ui/components/ui/image/types";

interface IProps {
  image: number | Media;
  aspectRatio: ImageAspectRatio;
}

export const prepareImageProps = ({
  image,
  aspectRatio,
}: IProps): IImageProps => {
  if (!image || typeof image !== "object" || !image.url) {
    return {
      src: null as unknown as string,
      alt: "",
      aspectRatio: ImageAspectRatio["16/9"],
      fill: true,
      fit: "cover",
    };
  }

  return {
    src: image.url,
    alt: image.alt || "",
    aspectRatio: aspectRatio as ImageAspectRatio,
    fill: true,
    fit: "cover",
    sizes: "(max-width: 1280px) 100vw, 1280px",
  };
};
