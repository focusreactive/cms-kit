import React from "react";

import { cn } from "@shared/ui";

import type { Props } from "../types";

export const VideoMedia: React.FC<Props> = (props) => {
  const { onClick, resource, videoClassName } = props;

  if (!resource?.filename) return null;

  return (
    <video
      autoPlay
      className={cn(videoClassName)}
      controls={false}
      loop
      muted
      onClick={onClick}
      playsInline
    >
      <source src={resource.filename} />
    </video>
  );
};
