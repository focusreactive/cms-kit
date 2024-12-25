import type { SectionHero } from "@/generated/extracted-types";

interface ISectionData {
  _key: string;
  paddingX?: "none";
  paddingY?: "none";
  marginTop?: "none" | "base" | "lg";
  marginBottom?: "none" | "base" | "lg";
  maxWidth?: SectionHero["maxWidth"];
  backgroundColor?: SectionHero["backgroundColor"];
  backgroundImage?: SectionHero["backgroundImage"];
}

export interface ISectionContainerProps {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
  sectionData: ISectionData;
}
