import { stegaClean } from "@sanity/client/stega";
import imageUrlBuilder from "@sanity/image-url";

import { cn } from "@shared/ui";

import { client } from "@/lib/api/client";

import type { ISectionContainerProps } from "./types";

const builder = imageUrlBuilder(client);

export default function SectionContainer({
  children,
  className,
  sectionData,
}: ISectionContainerProps) {
  const {
    _key,
    marginTop,
    marginBottom,
    paddingX,
    paddingY,
    maxWidth,
    backgroundColor,
    backgroundImage,
  } = sectionData;

  const backgroundImageUrl = backgroundImage
    ? builder.image(backgroundImage).auto("format").fit("max").url()
    : null;
  const style = backgroundImageUrl
    ? {
        background: `url(${backgroundImageUrl}) no-repeat center/cover`,
      }
    : {};

  const cleanMarginTop = stegaClean(marginTop);
  const cleanMarginBottom = stegaClean(marginBottom);
  const cleanBackgroundColor = stegaClean(backgroundColor); // implement using CSS variables
  const cleanMaxWidth = stegaClean(maxWidth);

  return (
    <section
      id={_key}
      className={cn(
        "bg-bgColor overflow-x-hidden",
        className,
        cleanBackgroundColor, // implement using CSS variables
        {
          "mt-0": cleanMarginTop === "none",
          "mb-0": cleanMarginBottom === "none",
          "mt-sectionBase": cleanMarginTop === "base",
          "mb-sectionBase": cleanMarginBottom === "base",
          "mt-sectionLg": cleanMarginTop === "lg",
          "mb-sectionLg": cleanMarginBottom === "lg",
        },
      )}
      style={style}
    >
      <div
        className={cn("mx-auto px-4 py-8", {
          "px-0": paddingX === "none",
          "py-0": paddingY === "none",
          "max-w-screen-xl": cleanMaxWidth === "base",
          "max-w-screen-sm": cleanMaxWidth === "small",
        })}
      >
        {children}
      </div>
    </section>
  );
}
