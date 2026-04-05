import { stegaClean } from "@sanity/client/stega";
import { cva } from "class-variance-authority";

import { cn } from "@shared/ui";

import { Media } from "@/components/Media";
import Container from "@/components/Container";

import type { ISectionContainerProps } from "./types";

const sectionVariants = cva("overflow-clip relative z-1", {
  variants: {
    paddingY: {
      none: "py-0",
      base: "py-sectionBase",
      large: "py-sectionLarge",
    },
  },
  defaultVariants: {
    paddingY: "base",
  },
});

export default function SectionContainer({
  children,
  className,
  containerClassName,
  sectionData,
}: ISectionContainerProps) {
  const { _key, theme, paddingY, paddingX, maxWidth, background } =
    sectionData;

  const cleanTheme = stegaClean(theme);
  const cleanPaddingY = stegaClean(paddingY);

  const overlayOpacity =
    background?.opacity != null ? background.opacity / 100 : undefined;

  return (
    <section
      id={_key}
      className={cn(
        sectionVariants({
          paddingY: cleanPaddingY,
        }),
        className,
      )}
      {...(cleanTheme ? { "data-theme": cleanTheme } : {})}
    >
      <Container
        containerData={{
          paddingX: stegaClean(paddingX),
          maxWidth: stegaClean(maxWidth),
        }}
        className={containerClassName}
      >
        {children}
      </Container>

      {background && (
        <>
          <Media
            background={background}
            aria-hidden
            className="absolute inset-0 size-full -z-2"
            imgClassName="size-full object-cover pointer-events-none"
            videoClassName="size-full object-cover pointer-events-none"
            fill
          />

          {background.overlay && (
            <div
              aria-hidden
              className="absolute inset-0 -z-1 pointer-events-none"
              style={{
                backgroundColor: `rgba(${stegaClean(background.overlay) === "black" ? "0,0,0" : "255,255,255"},${overlayOpacity})`,
              }}
            />
          )}
        </>
      )}
    </section>
  );
}
