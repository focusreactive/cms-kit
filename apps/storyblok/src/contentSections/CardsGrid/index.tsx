import { storyblokEditable } from "@storyblok/react/rsc";

import EmptyBlock from "@shared/ui/components/EmptyBlock";
import { CardsGrid as CardsGridUI } from "@shared/ui";

import type { IDefaultCardProps } from "@shared/ui/components/sections/cardsGrid/types";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import SectionContainer from "@/components/SectionContainer";

import type { ICardsGridProps } from "./types";

export default function CardsGrid({ blok }: ICardsGridProps) {
  const { items, columns, section, _uid } = blok;

  if (!items?.length) return <EmptyBlock name={blok.component as string} />;

  const formattedItems: IDefaultCardProps[] = items.map((item) => ({
    title: item.title,
    description: item.description,
    image: prepareImageProps(item?.image?.[0]),
    link: prepareLinkProps(item?.link?.[0]),
    alignVariant: (item.alignVariant || "left") as IDefaultCardProps["alignVariant"],
    rounded: (item.rounded || "none") as IDefaultCardProps["rounded"],
    backgroundColor: (item.backgroundColor || "none") as IDefaultCardProps["backgroundColor"],
  }));

  return (
    <SectionContainer
      sectionData={section?.[0]}
      id={_uid}
      editableAttrs={storyblokEditable(blok)}
    >
      <CardsGridUI items={formattedItems} columns={parseInt(columns || "3")} />
    </SectionContainer>
  );
}
