import EmptyBlock from "@shared/ui/components/EmptyBlock";
import type { AlignVariant } from "@shared/ui/components/sections/header/types";

import { Header as HeaderUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import SectionContainer from "@/components/SectionContainer";

import type { IHeaderProps } from "./types";

export default function Header({ blok }: IHeaderProps) {
  const { links, image, alignVariant } = blok;

  if (!image || links.length === 0)
    return <EmptyBlock name={blok.component as string} />;

  return (
    <SectionContainer
      blok={{ ...blok, paddingY: "none" }}
      className="sticky left-0 top-0 z-50"
    >
      <HeaderUI
        links={links.map(prepareLinkProps)}
        image={prepareImageProps(image[0])}
        alignVariant={alignVariant as AlignVariant}
      />
    </SectionContainer>
  );
}
