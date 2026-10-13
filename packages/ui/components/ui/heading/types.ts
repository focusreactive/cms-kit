import type { VariantProps } from "class-variance-authority";

import type { headingVariants } from ".";

export type HeadingVariantProps = VariantProps<typeof headingVariants>;

export interface IHeadingProps extends HeadingVariantProps {
  title: string;
  /**
   * Optional by design. The two sections using this differ precisely in whether
   * they pass a description, so the paragraph has to disappear when absent
   * rather than render an empty node that still takes up the gap.
   */
  description?: string;
  className?: string;
}

export enum HeadingAlign {
  Left = "left",
  Center = "center",
}

/**
 * The authored half of a heading — what a CMS section passes straight through
 * to `<Heading>`. Sections reference this rather than redeclaring the pair, so
 * adding a field to the heading reaches every section that uses it.
 */
export type IHeadingContent = Pick<IHeadingProps, "title" | "description">;
