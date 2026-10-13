// start of section imports
import Blog from "./Blog";
import CardsGrid from "./CardsGrid";
import Carousel from "./Carousel";
import Copy from "./Copy";
import FeatureColumns from "./FeatureColumns";
import Hero from "./Hero";
import LinksList from "./LinksList";
import Logos from "./Logos";
import ProcessSteps from "./ProcessSteps";

// end of section imports

export const sections: Record<string, any> = {
  // start of section object
  "section.copy": Copy,
  "section.logos": Logos,
  "section.linksList": LinksList,
  "section.cardsGrid": CardsGrid,
  "section.blog": Blog,
  "section.carousel": Carousel,
  "section.hero": Hero,
  "section.featureColumns": FeatureColumns,
  "section.processSteps": ProcessSteps,
  // end of section object
};

export function SectionRenderer(props: { section: any }) {
  const Section = sections[props.section._type];

  if (!Section) {
    return null;
  }

  return <Section data={props.section} />;
}
