import type { IImageProps } from "../../ui/image/types";
import type { LinkProps } from "../../ui/link/types";

export interface IDefaultCardProps {
  title: string;
  description?: string;
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
