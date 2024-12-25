import EmptyBlock from "@shared/ui/components/EmptyBlock";
import type { DefaultCardStyle } from "@shared/ui/components/sections/cardsGrid/types";

import { CardsGrid as CardsGridUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import SectionContainer from "@/components/SectionContainer";

import type { ICardsGridProps } from "./types";

export default function CardsGrid({ blok }: ICardsGridProps) {
  const { items, columns } = blok;

  if (items.length === 0) return <EmptyBlock name={blok.component as string} />;

  const formattedItems = items.map((item) => ({
    ...item,
    style: item.style as DefaultCardStyle,
    type: item._type,
    image: prepareImageProps(item?.image?.[0]),
    link: prepareLinkProps(item?.link?.[0]),
  }));

  return (
    <SectionContainer blok={blok}>
      <CardsGridUI items={formattedItems} columns={parseInt(columns)} />
    </SectionContainer>
  );
}
