import { storyblokEditable } from "@storyblok/react/rsc";

import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { Copy as CopyUI } from "@shared/ui";

import { prepareRichTextProps } from "@/lib/adapters/prepareRichTextProps";
import { prepareSectionData } from "@/lib/adapters/prepareSectionData";
import SectionContainer from "@/components/SectionContainer";

import type { ICopyProps } from "./types";

export default function Copy({ blok }: ICopyProps) {
  const { columns, isReversedOnMobile, section, _uid } = blok;

  if (columns.length === 0)
    return <EmptyBlock name={blok.component as string} />;

  return (
    <SectionContainer
      sectionData={prepareSectionData(section?.[0], _uid)}
      editableAttrs={storyblokEditable(blok)}
    >
      <CopyUI
        columns={columns.map(prepareRichTextProps)}
        isReversedOnMobile={!!isReversedOnMobile}
      />
    </SectionContainer>
  );
}
