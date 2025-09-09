export interface ISectionContainer {
  id?: number | string | null;
  maxWidth?: "none" | "base" | "small";
  marginTop?: "none" | "base" | "large";
  marginBottom?: "none" | "base" | "large";
  paddingX?: "none" | "base" | "large";
  paddingY?: "none" | "base" | "large";
  theme?: "light" | "dark" | "light-gray" | "dark-gray" | null;
  // TO-DO: add correct type for backgroundImage
  backgroundImage?: { filename: string };
  backgroundGradient?: "gradient-1";
}

export interface ISectionContainerProps {
  children: React.ReactNode;
  block: ISectionContainer;
  className?: string;
}
