import type { IImageProps } from "../../ui/image/types";
import type { LinkProps } from "../../ui/link/types";

export interface IPricingTier {
  name: string;
  icon: IImageProps;
  price?: number;
  description: string;
  features: string[];
  cta: LinkProps;
  popular?: boolean;
}

export interface IPricingProps {
  tiers: IPricingTier[];
  yearlyDiscountPercentage: number;
  extraServiceEnabled?: boolean;
  extraService?: {
    text: string;
    cost: number;
  };
}
