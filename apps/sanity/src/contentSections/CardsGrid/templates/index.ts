import type { Preset } from "@focus-reactive/sanity-plugin-cms-kit";

import { createTemplate } from "@/lib/utils";

import oneColumns from "./one-column.json";

export const cardsGridsTemplates: Preset[] = [
  createTemplate({
    title: "One column cards grid",
    json: oneColumns,
    category: "grid",
  }),
];
