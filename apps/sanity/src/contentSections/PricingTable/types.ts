import { type SectionPricingTable } from "@/generated/extracted-types";

export interface IPricingTableProps {
  data: SectionPricingTable & {
    _key: string;
  };
}
