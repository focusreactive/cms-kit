import type { IImageProps } from "../../ui/image/types";
import type { LinkProps } from "../../ui/link/types";
import type { IRichTextProps } from "../../ui/richText/types";

export enum BlogStyle {
  ThreeColumn = "three-column",
  ThreeColumnWithImages = "three-column-with-images",
  ThreeColumnWithBackgroundImages = "three-column-with-background-images",
}

export interface IBlogPostCardProps {
  text: IRichTextProps;
  image: IImageProps;
  link: LinkProps;
  style: BlogStyle;
  readMoreLabel?: string;
}

export interface IBlogSectionProps {
  text: IRichTextProps;
  posts: IBlogPostCardProps[];
  style: BlogStyle;
}
