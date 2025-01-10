import type { Preset } from "@focus-reactive/sanity-plugin-cms-kit";

import { createTemplate } from "@/lib/utils";

import defaultPreview from "./default-preview.png";
import defaultTemplate from "./default.json";

export const cardsGridsTemplates: Preset[] = [
  createTemplate({
    title: "Three columns cards grid",
    json: defaultTemplate,
    category: "cardsGrids",
    screenshot: defaultPreview.src,
  }),
];
