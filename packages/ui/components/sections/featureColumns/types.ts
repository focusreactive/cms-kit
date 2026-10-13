import type { IHeadingContent } from "../../ui/heading/types";
import type { IImageProps } from "../../ui/image/types";

export interface IFeatureColumnProps {
  icon?: IImageProps;
  title: string;
  description?: string;
}

export interface IFeatureColumnsProps {
  heading: IHeadingContent;
  items: IFeatureColumnProps[];
}
