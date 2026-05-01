import type { SectionSettingsStoryblok } from "@/generated/extracted-types";

export type ISectionData = SectionSettingsStoryblok;

export interface ISectionContainerProps {
  children: React.ReactNode;
  sectionData?: ISectionData;
  className?: string;
  containerClassName?: string;
  id?: string;
  editableAttrs?: Record<string, unknown>;
}
