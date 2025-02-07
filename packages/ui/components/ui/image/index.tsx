import NextImage from "next/image";

import { cn } from "../../../utils";
import type { IImageContainerProps, IImageProps } from "./types";

export function ImageContainer({
  children,
  aspectRatio,
}: IImageContainerProps) {
  return (
    <div
      className={cn("relative mx-auto h-full max-w-full", {
        "size-full": !aspectRatio,
      })}
      style={{
        aspectRatio,
      }}
    >
      {children}
    </div>
  );
}

export function Image({ aspectRatio, fit, ...props }: IImageProps) {
  return (
    <ImageContainer aspectRatio={aspectRatio}>
      {/* @ts-ignore */}
      <NextImage
        style={{
          marginTop: 0,
          marginBottom: 0,
          objectFit: fit,
        }}
        {...props}
      />
    </ImageContainer>
  );
}
