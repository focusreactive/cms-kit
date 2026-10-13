import type { SectionFeatureColumns } from "@/generated/extracted-types";

export interface IFeatureColumnsSectionProps {
  data: SectionFeatureColumns & {
    _key: string;
  };
}
