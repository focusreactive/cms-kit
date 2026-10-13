import { stegaClean } from "@sanity/client/stega";
import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { FeatureColumns as SharedFeatureColumns } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import SectionContainer from "@/components/SectionContainer";

import type { IFeatureColumnsSectionProps } from "./types";

export default function FeatureColumns({ data }: IFeatureColumnsSectionProps) {
  if (!data) return null;

  const { heading, items } = data;

  if (!items || items.length === 0)
    return <EmptyBlock name="Feature Columns" />;

  const formattedItems = items.map((item) => ({
    title: stegaClean(item.title),
    description: stegaClean(item.description),
    icon: prepareImageProps(item.icon),
  }));

  return (
    <SectionContainer sectionData={data}>
      <SharedFeatureColumns
        heading={{
          title: stegaClean(heading?.title) ?? "",
          description: stegaClean(heading?.description),
        }}
        items={formattedItems}
      />
    </SectionContainer>
  );
}
