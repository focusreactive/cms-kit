// start of section imports
import blog from "@/contentSections/Blog/schema";
import cardsGrid from "@/contentSections/CardsGrid/schema";
import carousel from "@/contentSections/Carousel/schema";
import copy from "@/contentSections/Copy/schema";
import hero from "@/contentSections/Hero/schema";
import linksList from "@/contentSections/LinksList/schema";
import logos from "@/contentSections/Logos/schema";
import pricing from "@/contentSections/PricingTable/schema";
import stepGuideSchema from "@/contentSections/StepGuide/schema";
import threeDElement from "@/contentSections/ThreeDElement/schema";

// end of section imports

const sections = [
  // start of section array
  copy,
  logos,
  linksList,
  cardsGrid,
  blog,
  carousel,
  hero,
  pricing,
  stepGuideSchema,
  threeDElement,
  // end of section array
];

export default sections;
