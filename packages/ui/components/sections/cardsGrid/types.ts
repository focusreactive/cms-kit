import type { IImageProps } from "../../ui/image/types";
import type { LinkProps } from "../../ui/link/types";
import type { IRichTextProps } from "../../ui/richText/types";

export interface IDefaultCardProps {
  title: string;
  description: IRichTextProps;
  image: IImageProps;
  link: LinkProps;
  alignVariant: "left" | "center" | "right";
  rounded: "none" | "large";
  backgroundColor: "none" | "light" | "dark" | "light-gray" | "dark-gray";
}

export interface ICardsGridProps {
  items: IDefaultCardProps[];
  columns: number;
}
