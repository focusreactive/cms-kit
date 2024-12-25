import EmptyBlock from "@shared/ui/components/EmptyBlock";

import { PricingTable as PricingTableUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import SectionContainer from "@/components/SectionContainer";

import type { IPricingTableProps } from "./types";

export default function PricingTable({ data }: IPricingTableProps) {
  if (!data || data.tiers.length === 0)
    return <EmptyBlock name="Pricing table" />;

  const { tiers } = data;

  const formattedTiers = tiers?.map((tier) => ({
    ...tier,
    icon: prepareImageProps(tier.icon),
    cta: prepareLinkProps(tier.link),
  }));

  return (
    <SectionContainer sectionData={data}>
      <PricingTableUI {...data} tiers={formattedTiers} />
    </SectionContainer>
  );
}
