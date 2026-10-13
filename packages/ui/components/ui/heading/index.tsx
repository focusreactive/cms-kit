import { cva } from "class-variance-authority";

import { cn } from "../../../utils";
import { HeadingAlign, type IHeadingProps } from "./types";

export const headingVariants = cva("not-prose flex flex-col gap-3", {
  variants: {
    align: {
      [HeadingAlign.Left]: "items-start text-left",
      [HeadingAlign.Center]: "items-center text-center",
    },
  },
  defaultVariants: {
    align: HeadingAlign.Left,
  },
});

/**
 * Shared section heading: a title with an optional description.
 *
 * Alignment is a prop rather than a schema field because no section lets an
 * author choose it — each one knows how it lays itself out.
 */
export function Heading({
  title,
  description,
  align,
  className,
}: IHeadingProps) {
  return (
    <div className={cn(headingVariants({ align }), className)}>
      <h2 className="text-textColor text-3xl font-semibold text-balance lg:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-textSecondaryColor max-w-prose text-base lg:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
