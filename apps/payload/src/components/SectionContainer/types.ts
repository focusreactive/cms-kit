// import type { AssetStoryblok } from "@/generated/extracted-types";
// import type { SbBlokData } from "@storyblok/react/rsc";

// export interface ISectionContainer extends SbBlokData {
export interface ISectionContainer {
  id: number;
  maxWidth?: "none" | "base" | "small";
  marginTop?: "none" | "base" | "large";
  marginBottom?: "none" | "base" | "large";
  paddingX?: "none" | "base" | "large";
  paddingY?: "none" | "base" | "large";
  theme?: "light" | "dark" | "light-gray" | "dark-gray" | "none";
  backgroundImage?: { filename: string };
  // backgroundImage?: AssetStoryblok;
  backgroundGradient?: "gradient-1";
}

export interface ISectionContainerProps {
  children: React.ReactNode;
  block: ISectionContainer;
  className?: string;
}
