import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { StepGuide as StepGuideUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import SectionContainer from "@/components/SectionContainer";

import type { IStepsGuideProps } from "./types";

export default function StepGuide({ data }: IStepsGuideProps) {
  const { items, link } = data;

  if (!items || items.length === 0) {
    return <EmptyBlock name="Step Guide Section" />;
  }

  const formattedItems = items.map((item) => ({
    ...item,
    image: prepareImageProps(item?.image),
  }));

  return (
    <SectionContainer sectionData={data}>
      <StepGuideUI items={formattedItems} link={prepareLinkProps(link)} />
    </SectionContainer>
  );
}
