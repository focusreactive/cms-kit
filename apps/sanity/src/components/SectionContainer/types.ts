export interface IBackgroundData {
  type?: "image" | "video";
  image?: { asset?: { _ref: string } };
  video?: { asset?: { _ref: string } };
  overlay?: "black" | "white";
  opacity?: number;
}

export interface ISectionData {
  _key: string;
  theme?: "light" | "dark" | "light-gray" | "dark-gray" | null;
  paddingY?: "none" | "base" | "large" | null;
  paddingX?: "none" | "base" | null;
  maxWidth?: "none" | "base" | null;
  background?: IBackgroundData;
}

export interface ISectionContainerProps {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
  containerClassName?: string;
  sectionData: ISectionData;
}
