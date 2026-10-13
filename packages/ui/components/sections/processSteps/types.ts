import type { IHeadingContent } from "../../ui/heading/types";

export interface IProcessStepProps {
  title: string;
  description?: string;
}

export interface IProcessStepsProps {
  heading: IHeadingContent;
  steps: IProcessStepProps[];
}
