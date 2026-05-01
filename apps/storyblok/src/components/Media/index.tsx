import React, { Fragment } from "react";

import { ImageMedia } from "./ImageMedia";
import { VideoMedia } from "./VideoMedia";

import type { Props } from "./types";

function isVideoAsset(resource: NonNullable<Props["resource"]>) {
  if (resource.content_type?.startsWith("video/")) return true;
  const ext = resource.filename?.split(".").pop()?.toLowerCase() ?? "";
  return ["mp4", "webm", "mov", "ogg"].includes(ext);
}

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = "div", resource } = props;

  const isVideo = !!resource && isVideoAsset(resource);
  const Tag = htmlElement || Fragment;

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  );
};

export type { Props as MediaProps } from "./types";
