"use client";

import { useEffect, useRef } from "react";

import { cn } from "@shared/ui";

import type { MediaProps } from "..";

export function VideoMedia({ background, videoClassName }: MediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = background.video;

  useEffect(() => {
    const el = videoRef.current;
    if (el) {
      el.addEventListener("suspend", () => {
        // fallback handling if needed
      });
    }
  }, []);

  if (!video?.asset?._ref) return null;

  // Sanity file asset URL: https://cdn.sanity.io/files/{projectId}/{dataset}/{id}.{ext}
  const ref = video.asset._ref;
  const [, id, ext] = ref.split("-");
  const url = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${ext}`;

  return (
    <video
      autoPlay
      className={cn(videoClassName)}
      controls={false}
      loop
      muted
      playsInline
      ref={videoRef}
    >
      <source src={url} />
    </video>
  );
}
