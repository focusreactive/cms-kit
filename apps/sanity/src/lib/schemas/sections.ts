// start of section imports
import blog from "@/contentSections/Blog/schema";
import cardsGrid from "@/contentSections/CardsGrid/schema";
import carousel from "@/contentSections/Carousel/schema";
import copy from "@/contentSections/Copy/schema";
import hero from "@/contentSections/Hero/schema";
import linksList from "@/contentSections/LinksList/schema";
import logos from "@/contentSections/Logos/schema";

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
  // end of section array
];

export default sections;
