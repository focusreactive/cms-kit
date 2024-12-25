import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { StepGuide as StepGuideUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import SectionContainer from "@/components/SectionContainer";

import type { IStepGuideProps } from "./types";

export default function StepGuide({ blok }: IStepGuideProps) {
  const { stepGuideItem, link } = blok;

  if (!stepGuideItem || stepGuideItem.length === 0)
    return <EmptyBlock name={blok.component as string} />;

  const formattedItems = stepGuideItem.map((item) => ({
    ...item,
    image: prepareImageProps(item?.image?.[0]),
  }));

  return (
    <SectionContainer blok={blok}>
      <StepGuideUI items={formattedItems} link={prepareLinkProps(link?.[0])} />
    </SectionContainer>
  );
}
