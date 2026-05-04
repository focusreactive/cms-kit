import { storyblokEditable } from "@storyblok/react/rsc";

import EmptyBlock from "@shared/ui/components/EmptyBlock";
import type { AlignVariant } from "@shared/ui/components/sections/logos/types";

import { Logos as LogosUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import SectionContainer from "@/components/SectionContainer";

import type { ILogosProps } from "./types";

export default function Logos({ blok }: ILogosProps) {
  const { items, alignVariant, section, _uid } = blok;

  if (items.length === 0) return <EmptyBlock name={blok.component as string} />;

  const formattedItems = items.map((item) => ({
    ...item,
    image: prepareImageProps(item.image[0]),
    link:
      item.type === "clickableLogo" && item.link
        ? prepareLinkProps(item.link[0])
        : undefined,
  }));

  return (
    <SectionContainer
      sectionData={section?.[0]}
      id={_uid}
      editableAttrs={storyblokEditable(blok)}
    >
      <LogosUI
        items={formattedItems}
        alignVariant={alignVariant as AlignVariant}
      />
    </SectionContainer>
  );
}
