import { storyblokEditable } from "@storyblok/react/rsc";

import EmptyBlock from "@shared/ui/components/EmptyBlock";
import type { AlignVariant } from "@shared/ui/components/sections/linksList/types";

import { LinksList as LinksListUI } from "@shared/ui";

import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import SectionContainer from "@/components/SectionContainer";

import type { ILinksLinkProps } from "./types";

export default function LinksList({ blok }: ILinksLinkProps) {
  const { links, alignVariant, section, _uid } = blok;

  if (links.length === 0) return <EmptyBlock name={blok.component as string} />;

  return (
    <SectionContainer
      sectionData={section?.[0]}
      id={_uid}
      editableAttrs={storyblokEditable(blok)}
    >
      <LinksListUI
        alignVariant={alignVariant as AlignVariant}
        links={links.map(prepareLinkProps)}
      />
    </SectionContainer>
  );
}
