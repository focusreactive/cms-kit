import type { ImageProps } from "next/image";

export enum ImageAspectRatio {
  "16/9" = "16/9",
  "3/2" = "3/2",
  "4/3" = "4/3",
  "1/1" = "1/1",
  "9/16" = "9/16",
  "1/2" = "1/2",
  "4/1" = "4/1",
  "3/1" = "3/1",
  "auto" = "auto",
}

export interface IImageContainerProps {
  aspectRatio: ImageAspectRatio;
  children: React.ReactNode;
}

export interface IImageProps extends ImageProps {
  aspectRatio: ImageAspectRatio;
  fit?: "cover" | "contain";
}
