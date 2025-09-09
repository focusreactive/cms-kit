import React from "react";
import type { StaticImageData } from "next/image";
import type { MediaBlock as MediaBlockProps } from "@/generated/payload-types";

import { cn } from "@shared/ui";

import renderRichText from "@/lib/renderRichText";

import { Media } from "../../Media";

type Props = MediaBlockProps & {
  breakout?: boolean;
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  staticImage?: StaticImageData;
  disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props;

  let caption;
  if (media && typeof media === "object") caption = media.caption;

  return (
    <div
      className={cn(
        "mx-auto my-16 max-w-screen-xl overflow-x-hidden rounded-2xl",
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn(
            "border border-border rounded-[0.8rem]",
            imgClassName,
          )}
          resource={media}
          src={staticImage}
        />
      )}
      {caption && (
        <div
          className={cn(
            "mt-6",
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          {renderRichText({ data: caption, enableGutter: false })}
        </div>
      )}
    </div>
  );
};
