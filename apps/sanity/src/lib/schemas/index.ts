import { blogPost } from "@/contentSections/Blog/schema";
import { defaultCard } from "@/contentSections/CardsGrid/schema";
import { carouselCard } from "@/contentSections/Carousel/schema";
import { logoItem } from "@/contentSections/Logos/schema";
import { pricingTier } from "@/contentSections/PricingTable/schema";
import { stepGuideItem } from "@/contentSections/StepGuide/schema";

import footer from "@/components/Footer/schema";
import header from "@/components/Header/schema";
import page from "@/components/Page/schema";

import customImage from "./customImage";
import customLink from "./customLink";
import customRichText, { basicRichText, richTextBreak } from "./customRichText";
import sections from "./sections";

const schemas = [
  page,
  header,
  footer,
  customImage,
  customLink,
  customRichText,
  logoItem,
  defaultCard,
  richTextBreak,
  basicRichText,
  blogPost,
  carouselCard,
  pricingTier,
  stepGuideItem,
  ...sections,
];

export default schemas;
