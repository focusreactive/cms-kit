import imageUrlBuilder from "@sanity/image-url";
import NextImage from "next/image";

import { cn } from "@shared/ui";

import { client } from "@/lib/api/client";

import type { MediaProps } from "..";

const builder = imageUrlBuilder(client);

export function ImageMedia({
  background,
  imgClassName,
  pictureClassName,
  fill,
  priority,
  loading: loadingFromProps,
  sizes,
}: MediaProps) {
  const image = background.image;
  if (!image?.asset) return null;

  const url = builder.image(image).auto("format").fit("max").url();
  const loading = loadingFromProps || (!priority ? "lazy" : undefined);

  return (
    <picture className={cn(pictureClassName)}>
      <NextImage
        src={url}
        alt=""
        fill={fill}
        className={cn(imgClassName)}
        priority={priority}
        quality={100}
        loading={loading}
        sizes={sizes}
        aria-hidden
      />
    </picture>
  );
}
