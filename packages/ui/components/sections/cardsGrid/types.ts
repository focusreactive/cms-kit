import type { IImageProps } from "../../ui/image/types";
import type { LinkProps } from "../../ui/link/types";

export enum DefaultCardStyle {
  IconTop = "icon-top",
  IconTitleInline = "icon-title-inline",
  IconLeftWithBackground = "icon-left-with-background",
  NoIcon = "no-icon",
  IconLeftSeparateTitle = "icon-left-separate-title",
  IconLeft = "icon-left",
}

export interface IDefaultCardProps {
  title: string;
  description?: string;
  style: DefaultCardStyle;
  image?: IImageProps;
  link?: LinkProps;
}

export interface ICardsGridProps {
  items: IDefaultCardProps[];
  columns: number;
}
