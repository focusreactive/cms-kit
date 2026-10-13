import type { SectionProcessSteps } from "@/generated/extracted-types";

export interface IProcessStepsSectionProps {
  data: SectionProcessSteps & {
    _key: string;
  };
}
