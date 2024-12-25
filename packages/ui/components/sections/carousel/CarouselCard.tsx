import { cn } from "../../../utils";
import { Image } from "../../ui/image";
import { ImageAspectRatio } from "../../ui/image/types";
import { RichText } from "../../ui/richText";
import type { ICarouselCardProps } from "./types";

export default function CarouselCard({
  image,
  text,
  isActive,
  effect,
}: ICarouselCardProps) {
  const imageWrapperProps = {
    className: "h-80 w-full",
    style: {
      aspectRatio: ImageAspectRatio[image.aspectRatio as ImageAspectRatio],
    },
  };

  return (
    <div
      className={cn(
        "user-select-none border-secondaryColor bg-bgColor h-full border p-6 transition-all duration-300",
        {
          "bg-gray-100": !isActive && effect !== "fade" && effect !== "slide",
          "border-none": effect === "fade",
          "rounded-xl": effect !== "cube",
        },
      )}
    >
      <div {...imageWrapperProps}>
        <Image {...image} fit="contain" />
      </div>
      {text && (
        <RichText
          {...text}
          className={
            "prose-headings:mb-1 prose-headings:text-xl prose-headings:font-medium prose-p:text-base"
          }
        />
      )}
    </div>
  );
}
