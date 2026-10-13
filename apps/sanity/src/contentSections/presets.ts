import { cardsGridsTemplates } from "./CardsGrid/templates";
import { copyTemplates } from "./Copy/templates";
import { featureColumnsTemplates } from "./FeatureColumns/templates";
import { heroTemplates } from "./Hero/templates";
import { linksListTemplates } from "./LinksList/templates";
import { logosTemplates } from "./Logos/templates";
import { processStepsTemplates } from "./ProcessSteps/templates";

/**
 * Every section reachable from the page builder. `Page/schema.ts` flattens this
 * into the "Add Block..." browser, which is the ONLY way to add a section — it
 * replaces the array's default add button — so a section missing from here
 * cannot be inserted, however well it is registered elsewhere.
 */
export const sectionsPresets = {
  logos: logosTemplates,
  cardsGrids: cardsGridsTemplates,
  copy: copyTemplates,
  linksList: linksListTemplates,
  hero: heroTemplates,
  featureColumns: featureColumnsTemplates,
  processSteps: processStepsTemplates,
};
