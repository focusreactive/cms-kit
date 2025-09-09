import type { Header } from "@/generated/payload-types";
import EmptyBlock from "@shared/ui/components/EmptyBlock";
import type { AlignVariant } from "@shared/ui/components/sections/header/types";

import { Header as HeaderUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import { getCachedGlobal } from "@/lib/utilities/getGlobals";
import SectionContainer from "@/components/SectionContainer";

export default async function Header() {
  const headerData: Header = await getCachedGlobal("header", 1)();
  console.log("headerData===========>", headerData);

  const { links, image, alignVariant } = headerData;

  if (!links || links.length === 0) return <EmptyBlock name="Header" />;

  return (
    <SectionContainer
      block={{
        ...headerData,
        paddingY: "none",
        paddingX: "none",
        marginTop: "none",
        marginBottom: "none",
        theme: undefined,
      }}
      className="sticky left-0 top-0 z-50 rounded-t-none"
    >
      <HeaderUI
        links={links.map(prepareLinkProps)}
        image={prepareImageProps(image)}
        alignVariant={alignVariant as AlignVariant}
      />
    </SectionContainer>
  );
}
