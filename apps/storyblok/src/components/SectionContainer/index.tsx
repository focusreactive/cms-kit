import { storyblokEditable } from "@storyblok/react/rsc";

import { cn, cva } from "@shared/ui";

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
    backgroundGradient,
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
        "mx-auto max-w-screen-xl overflow-x-hidden rounded-2xl",
        className,
        theme,
        outerVariants({
          marginTop,
          marginBottom,
          backgroundGradient,
        }),
        {
          "bg-bgColor": !!theme && !backgroundGradient,
        },
      )}
      id={_uid}
      style={style}
    >
      <div
        className={cn(
          "mx-auto px-4 py-8",
          innerVariants({
            paddingX,
            paddingY,
            maxWidth,
          }),
        )}
      >
        {children}
      </div>
    </section>
  );
}

const outerVariants = cva("", {
  variants: {
    marginTop: {
      none: "mt-0",
      base: "mt-sectionBase",
      large: "mt-sectionLarge",
    },
    marginBottom: {
      none: "mb-0",
      base: "mb-sectionBase",
      large: "mb-sectionLarge",
    },
    backgroundGradient: {
      "gradient-1": "bg-gradient-to-br from-white to-primaryLightColor",
    },
  },
  defaultVariants: {
    marginTop: "base",
    marginBottom: "base",
  },
});

const innerVariants = cva("", {
  variants: {
    paddingX: {
      none: "px-0",
      base: "px-sectionBase",
      large: "px-sectionLarge",
    },
    paddingY: {
      none: "py-0",
      base: "py-sectionBase",
      large: "py-sectionLarge",
    },
    maxWidth: {
      base: "max-w-screen-xl",
      small: "max-w-screen-sm",
      none: "max-w-none",
    },
  },
  defaultVariants: {
    paddingX: "base",
    paddingY: "base",
    maxWidth: "base",
  },
});
