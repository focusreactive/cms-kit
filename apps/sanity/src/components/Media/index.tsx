import { stegaClean } from "@sanity/client/stega";

import { ImageMedia } from "./ImageMedia";
import { VideoMedia } from "./VideoMedia";

import type { ElementType } from "react";

export interface BackgroundData {
  type?: "image" | "video";
  image?: { asset?: { _ref: string } };
  video?: { asset?: { _ref: string } };
  overlay?: "black" | "white";
  opacity?: number;
}

export interface MediaProps {
  className?: string;
  pictureClassName?: string;
  imgClassName?: string;
  videoClassName?: string;
  htmlElement?: ElementType | null;
  fill?: boolean;
  priority?: boolean;
  loading?: "lazy" | "eager";
  sizes?: string;
  background: BackgroundData;
}

export function Media(props: MediaProps) {
  const { className, htmlElement, background } = props;

  const type = stegaClean(background.type);
  const isVideo = type === "video" && !!background.video?.asset;
  const isImage = type === "image" && !!background.image?.asset;

  if (!isVideo && !isImage) return null;

  const Tag = htmlElement ?? "div";

  return (
    <Tag className={className}>
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  );
}
