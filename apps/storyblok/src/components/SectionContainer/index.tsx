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
    backgroundColor,
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
      className={cn(
        "bg-bgColor overflow-x-hidden",
        className,
        backgroundColor,
        {
          "mt-0": marginTop === "none",
          "mb-0": marginBottom === "none",
          "mt-sectionBase": marginTop === "base",
          "mb-sectionBase": marginBottom === "base",
          "mt-sectionLg": marginTop === "lg",
          "mb-sectionLg": marginBottom === "lg",
        },
      )}
      id={_uid}
      style={style}
    >
      <div
        className={cn("mx-auto px-4 py-8", {
          "px-0": paddingX === "none",
          "py-0": paddingY === "none",
          "max-w-screen-xl": maxWidth === "base",
          "max-w-screen-sm": maxWidth === "small",
        })}
      >
        {children}
      </div>
    </section>
  );
}
