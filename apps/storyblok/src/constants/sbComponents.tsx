// start of sb components imports
import Blog from "@/contentSections/Blog";
import CardsGrid from "@/contentSections/CardsGrid";
import Copy from "@/contentSections/Copy";
import Hero from "@/contentSections/Hero";
import LinksList from "@/contentSections/LinksList";
import Logos from "@/contentSections/Logos";
import Carousel from "src/contentSections/Carousel";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageContainer from "@/components/Page";

// end of sb components imports

export const COMPONENTS = {
  // start of sb components mapping
  page: PageContainer,
  copy: Copy,
  header: Header,
  footer: Footer,
  logos: Logos,
  linksList: LinksList,
  cardsGrid: CardsGrid,
  blog: Blog,
  carousel: Carousel,
  hero: Hero,
  // end of sb components mapping
};
