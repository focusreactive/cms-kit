export type {
  ISectionBackground,
  ISectionData,
} from "@/lib/adapters/prepareSectionData";

import type { ISectionData } from "@/lib/adapters/prepareSectionData";

export interface ISectionContainerProps {
  children: React.ReactNode;
  sectionData?: ISectionData;
  className?: string;
  containerClassName?: string;
  editableAttrs?: Record<string, unknown>;
}
