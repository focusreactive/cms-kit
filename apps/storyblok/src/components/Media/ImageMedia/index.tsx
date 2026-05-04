import NextImage from "next/image";
import React from "react";

import { cn } from "@shared/ui";

import type { StaticImageData } from "next/image";

import type { Props } from "../types";

export const ImageMedia: React.FC<Props> = (props) => {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
  } = props;

  let width: number | undefined;
  let height: number | undefined;
  let alt = altFromProps;
  let src: StaticImageData | string = srcFromProps || "";

  if (!src && resource) {
    const {
      alt: altFromResource,
      height: fullHeight,
      width: fullWidth,
      filename,
    } = resource;

    width = fullWidth!;
    height = fullHeight!;
    alt = altFromResource || "";

    src = filename || "";
  }

  const loading = loadingFromProps || (!priority ? "lazy" : undefined);

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps;

  return (
    <picture className={cn(pictureClassName)}>
      <NextImage
        alt={alt || ""}
        className={cn(imgClassName)}
        fill={fill}
        height={!fill ? height : undefined}
        priority={priority}
        quality={100}
        loading={loading}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
      />
    </picture>
  );
};
