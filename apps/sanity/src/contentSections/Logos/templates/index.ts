import type { Preset } from "@focus-reactive/sanity-plugin-cms-kit";

import { createTemplate } from "@/lib/utils";

import logos from "./logos.json";

export const logosTemplates: Preset[] = [
  createTemplate({
    title: "Logos list",
    json: logos,
    category: "logos",
  }),
];
