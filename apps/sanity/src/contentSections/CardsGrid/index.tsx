import { stegaClean } from "@sanity/client/stega";
import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { CardsGrid as SharedCardsGrid } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import SectionContainer from "@/components/SectionContainer";

import type { ICardsGridSectionProps } from "./types";

export default function CardsGrid({ data }: ICardsGridSectionProps) {
  if (!data) return null;

  const { items, columns } = data;

  if (!items || items.length === 0) return <EmptyBlock name="Cards Grid" />;

  const formattedItems = items?.map((item) => ({
    alignVariant: stegaClean(item.alignVariant),
    backgroundColor: stegaClean(item.backgroundColor),
    description: stegaClean(item.description),
    rounded: stegaClean(item.rounded),
    title: stegaClean(item.title),
    type: stegaClean(item._type),
    image: prepareImageProps(item.image),
    link: prepareLinkProps(item.link),
  }));

  return (
    <SectionContainer sectionData={data}>
      <SharedCardsGrid items={formattedItems || []} columns={columns} />
    </SectionContainer>
  );
}
