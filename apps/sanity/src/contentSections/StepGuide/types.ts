import { type SectionStepGuide } from "@/generated/extracted-types";

export interface IStepsGuideProps {
  data: SectionStepGuide & {
    _key: string;
  };
}
