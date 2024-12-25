import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { ThreeDElement as ThreeDElementUI } from "@shared/ui";

import SectionContainer from "@/components/SectionContainer";

import type { IThreeDElementProps } from "./types";

export default function ThreeDElement({ blok }: IThreeDElementProps) {
  const { threeDModel } = blok;

  if (!threeDModel) return <EmptyBlock name={blok.component as string} />;

  return (
    <SectionContainer blok={blok}>
      <ThreeDElementUI model={threeDModel} />
    </SectionContainer>
  );
}
