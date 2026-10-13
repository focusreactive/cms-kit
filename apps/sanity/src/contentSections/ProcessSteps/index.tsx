import { stegaClean } from "@sanity/client/stega";
import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { ProcessSteps as SharedProcessSteps } from "@shared/ui";

import SectionContainer from "@/components/SectionContainer";

import type { IProcessStepsSectionProps } from "./types";

export default function ProcessSteps({ data }: IProcessStepsSectionProps) {
  if (!data) return null;

  const { heading, steps } = data;

  if (!steps || steps.length === 0) return <EmptyBlock name="Process Steps" />;

  const formattedSteps = steps.map((step) => ({
    title: stegaClean(step.title),
    description: stegaClean(step.description),
  }));

  return (
    <SectionContainer sectionData={data}>
      <SharedProcessSteps
        heading={{
          title: stegaClean(heading?.title) ?? "",
          description: stegaClean(heading?.description),
        }}
        steps={formattedSteps}
      />
    </SectionContainer>
  );
}
