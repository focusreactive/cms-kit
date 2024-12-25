import type { IImageProps } from "../../ui/image/types";
import type { LinkProps } from "../../ui/link/types";

interface IStepGuideItem {
  number: string;
  text: string;
  image: IImageProps;
}

export interface IStepGuideProps {
  link: LinkProps;
  items: IStepGuideItem[];
}
