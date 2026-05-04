import { stegaClean } from "@sanity/client/stega";
import EmptyBlock from "@shared/ui/components/EmptyBlock";
import type { AlignVariant } from "@shared/ui/components/sections/header/types";

import { Header as HeaderUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";

import type { IHeaderProps } from "./types";

export default function Header({ data }: IHeaderProps) {
  if (!data) return null;

  const { links, image, alignVariant } = data;

  if ((!links || links.length === 0) && !image)
    return <EmptyBlock name="Header" />;

  return (
      <HeaderUI
        links={links?.map(prepareLinkProps) || []}
        image={prepareImageProps(image)}
        alignVariant={stegaClean(alignVariant) as AlignVariant}
      />
  );
}
