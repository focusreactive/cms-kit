import { cn, cva } from "@shared/ui";

import type { ISectionData } from "../SectionContainer/types";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    paddingX: {
      none: "px-0",
      base: "px-containerBase",
    },
    maxWidth: {
      none: "max-w-none",
      base: "max-w-containerMaxW",
    },
  },
  defaultVariants: {
    paddingX: "base",
    maxWidth: "base",
  },
});

type ContainerProps = {
  children: React.ReactNode;
  containerData: Pick<ISectionData, "paddingX" | "maxWidth">;
  className?: string;
};

export default function Container({
  children,
  containerData,
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        containerVariants({
          paddingX: containerData.paddingX || undefined,
          maxWidth: containerData.maxWidth || undefined,
        }),
        className,
      )}
    >
      {children}
    </div>
  );
}
