import { storyblokEditable } from "@storyblok/react/rsc";

import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { Copy as CopyUI } from "@shared/ui";

import { prepareRichTextProps } from "@/lib/adapters/prepareRichTextProps";
import SectionContainer from "@/components/SectionContainer";

import type { ICopyProps } from "./types";

export default function Copy({ blok }: ICopyProps) {
  const { columns, isReversedOnMobile, section, _uid } = blok;

  if (columns.length === 0)
    return <EmptyBlock name={blok.component as string} />;

  return (
    <SectionContainer
      sectionData={section?.[0]}
      id={_uid}
      editableAttrs={storyblokEditable(blok)}
    >
      <CopyUI
        columns={columns.map(prepareRichTextProps)}
        isReversedOnMobile={!!isReversedOnMobile}
      />
    </SectionContainer>
  );
}
