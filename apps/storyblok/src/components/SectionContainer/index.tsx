import { cn, cva } from "@shared/ui";

import Container from "@/components/Container";
import { Media } from "@/components/Media";

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
  id,
  editableAttrs,
}: ISectionContainerProps) {
  const { theme, paddingY, paddingX, maxWidth, media, overlay, opacity } =
    sectionData ?? {};

  const overlayOpacity = opacity ? Number(opacity) / 100 : undefined;
  const hasMedia = !!media?.filename;

  return (
    <section
      id={id}
      className={cn(sectionVariants({ paddingY: paddingY || undefined }), className)}
      {...(theme ? { "data-theme": theme } : {})}
      {...(editableAttrs ?? {})}
    >
      <Container
        containerData={{ paddingX, maxWidth }}
        className={containerClassName}
      >
        {children}
      </Container>

      {hasMedia && (
        <>
          <Media
            resource={media}
            className="absolute inset-0 size-full -z-2"
            imgClassName="size-full object-cover pointer-events-none"
            videoClassName="size-full object-cover pointer-events-none"
            fill
            aria-hidden
          />

          {overlay && (
            <div
              aria-hidden
              className="absolute inset-0 -z-1 pointer-events-none"
              style={{
                backgroundColor: `rgba(${overlay === "black" ? "0,0,0" : "255,255,255"},${overlayOpacity})`,
              }}
            />
          )}
        </>
      )}
    </section>
  );
}
