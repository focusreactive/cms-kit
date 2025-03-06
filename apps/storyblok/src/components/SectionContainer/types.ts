import type { AssetStoryblok } from "@/generated/extracted-types";
import type { SbBlokData } from "@storyblok/react/rsc";

export interface ISectionContainer extends SbBlokData {
  maxWidth?: "none" | "base" | "small";
  marginTop?: "none" | "base" | "large";
  marginBottom?: "none" | "base" | "large";
  paddingX?: "none" | "base" | "large";
  paddingY?: "none" | "base" | "large";
  theme?: "light" | "dark" | "light-gray" | "dark-gray" | "none";
  backgroundImage?: AssetStoryblok;
}

export interface ISectionContainerProps {
  children: React.ReactNode;
  blok: ISectionContainer;
  className?: string;
}
