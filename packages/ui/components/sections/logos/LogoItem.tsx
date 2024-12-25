import { cn } from "../../../utils";
import { Image } from "../../ui/image";
import { ImageAspectRatio } from "../../ui/image/types";
import { Link } from "../../ui/link";
import type { ILogoItem } from "./types";

export default function LogoItem({ image, link }: ILogoItem) {
  const imageWrapperProps = {
    className: cn(link?.className, "mx-auto [height:inherit]"),
    style: {
      aspectRatio: ImageAspectRatio[image.aspectRatio as ImageAspectRatio],
    },
  };

  if (link) {
    return (
      <Link {...link} {...imageWrapperProps}>
        {image && <Image {...image} fit="contain" />}
      </Link>
    );
  }

  return (
    <div {...imageWrapperProps}>
      <Image {...image} fit="contain" />
    </div>
  );
}
