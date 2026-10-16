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
  editableAttrs,
}: ISectionContainerProps) {
  const { theme, paddingY, background } = sectionData ?? {};
  const { media, overlay, opacity } = background ?? {};

  const overlayOpacity = opacity != null ? opacity / 100 : undefined;
  const hasMedia = !!media?.filename;

  return (
    <section
      id={sectionData?.id ?? undefined}
      className={cn(sectionVariants({ paddingY: paddingY || undefined }), className)}
      {...(theme ? { "data-theme": theme } : {})}
      {...(editableAttrs ?? {})}
    >
      <Container containerData={sectionData} className={containerClassName}>
        {children}
      </Container>

      {hasMedia && (
        <>
          <Media
            resource={media}
            className="absolute inset-0 size-full -z-2 pointer-events-none"
            imgClassName="size-full object-cover"
            videoClassName="size-full object-cover"
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
