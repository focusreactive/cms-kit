import type { Preset } from "@focus-reactive/sanity-plugin-cms-kit";

import { createTemplate } from "@/lib/utils";

import centeredDark from "./image-cards-grid.json";

export const copyTemplates: Preset[] = [
  createTemplate({
    title: "Text, cards grid and an image",
    json: centeredDark,
    category: "copy",
  }),
];
