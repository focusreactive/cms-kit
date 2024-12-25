import { stegaClean } from "@sanity/client/stega";
import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { ThreeDElement as ThreeDElementUI } from "@shared/ui";

import SectionContainer from "@/components/SectionContainer";

import type { IThreeDElementProps } from "./types";

export default function ThreeDElement({ data }: IThreeDElementProps) {
  const { model } = data;

  if (!model) return <EmptyBlock name="3D Element Section" />;

  return (
    <SectionContainer sectionData={data}>
      <ThreeDElementUI model={stegaClean(model)} />
    </SectionContainer>
  );
}
