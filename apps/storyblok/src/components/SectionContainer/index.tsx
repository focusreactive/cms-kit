import { storyblokEditable } from "@storyblok/react/rsc";

import { cn } from "@shared/ui";

import type { ISectionContainerProps } from "./types";

export default function SectionContainer({
  children,
  blok,
  className,
}: ISectionContainerProps) {
  const {
    _uid,
    paddingX,
    paddingY,
    marginTop,
    marginBottom,
    maxWidth,
    theme,
    backgroundImage,
  } = blok;

  const style = backgroundImage?.filename
    ? {
        background: `url(${backgroundImage.filename}) no-repeat center/cover`,
      }
    : {};

  return (
    <section
      {...storyblokEditable(blok)}
      className={cn("overflow-x-hidden", className, theme, {
        "bg-bgColor": !!theme,
        "mt-0": marginTop === "none",
        "mb-0": marginBottom === "none",
        "mt-sectionBase": marginTop === "base",
        "mb-sectionBase": marginBottom === "base",
        "mt-sectionLarge": marginTop === "large",
        "mb-sectionLarge": marginBottom === "large",
      })}
      id={_uid}
      style={style}
    >
      <div
        className={cn("mx-auto px-4 py-8", {
          "px-0": paddingX === "none",
          "py-0": paddingY === "none",
          "px-sectionBase": paddingX === "base",
          "py-sectionBase": paddingY === "base",
          "px-sectionLarge": paddingX === "large",
          "py-sectionLarge": paddingY === "large",
          "max-w-screen-xl": maxWidth === "base",
          "max-w-screen-sm": maxWidth === "small",
        })}
      >
        {children}
      </div>
    </section>
  );
}
