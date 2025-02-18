import type { SectionHero } from "@/generated/extracted-types";

interface ISectionData {
  _key: string;
  paddingX?: "none" | "base" | "large";
  paddingY?: "none" | "base" | "large";
  marginTop?: "none" | "base" | "large";
  marginBottom?: "none" | "base" | "large";
  maxWidth?: SectionHero["maxWidth"];
  backgroundImage?: SectionHero["backgroundImage"];
  theme?: SectionHero["theme"];
}

export interface ISectionContainerProps {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
  sectionData: ISectionData;
}
