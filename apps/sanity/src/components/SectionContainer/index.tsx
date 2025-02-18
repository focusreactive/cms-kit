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
    theme,
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
  const cleanPaddingX = stegaClean(paddingX);
  const cleanPaddingY = stegaClean(paddingY);
  const cleanTheme = stegaClean(theme);
  const cleanMaxWidth = stegaClean(maxWidth);

  return (
    <section
      id={_key}
      className={cn("overflow-x-hidden", className, cleanTheme, {
        "bg-bgColor": !!cleanTheme,
        "mt-0": cleanMarginTop === "none",
        "mb-0": cleanMarginBottom === "none",
        "mt-sectionBase": cleanMarginTop === "base",
        "mb-sectionBase": cleanMarginBottom === "base",
        "mt-sectionLarge": cleanMarginTop === "large",
        "mb-sectionLarge": cleanMarginBottom === "large",
      })}
      style={style}
    >
      <div
        className={cn("mx-auto px-4 py-8", {
          "px-0": cleanPaddingX === "none",
          "py-0": cleanPaddingY === "none",
          "px-sectionBase": cleanPaddingX === "base",
          "py-sectionBase": cleanPaddingY === "base",
          "px-sectionLarge": cleanPaddingX === "large",
          "py-sectionLarge": cleanPaddingY === "large",
          "max-w-screen-xl": cleanMaxWidth === "base",
          "max-w-screen-sm": cleanMaxWidth === "small",
        })}
      >
        {children}
      </div>
    </section>
  );
}
