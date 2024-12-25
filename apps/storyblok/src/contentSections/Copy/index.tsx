import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { Copy as CopyUI } from "@shared/ui";

import { prepareRichTextProps } from "@/lib/adapters/prepareRichTextProps";
import SectionContainer from "@/components/SectionContainer";

import type { ICopyProps } from "./types";

export default function Copy({ blok }: ICopyProps) {
  const { columns, isReversedOnMobile } = blok;

  if (columns.length === 0)
    return <EmptyBlock name={blok.component as string} />;

  return (
    <SectionContainer blok={blok}>
      <CopyUI
        columns={columns.map(prepareRichTextProps)}
        isReversedOnMobile={!!isReversedOnMobile}
      />
    </SectionContainer>
  );
}
