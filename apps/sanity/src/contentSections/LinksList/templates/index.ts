import type { Preset } from "@focus-reactive/sanity-plugin-cms-kit";

import { createTemplate } from "@/lib/utils";

import badge from "./badge.json";
import primarySecondary from "./primary-secondary.json";

export const linksListTemplates: Preset[] = [
  createTemplate({
    title: "Badge link style",
    json: badge,
    category: "linksList",
  }),
  createTemplate({
    title: "Primary and secondary links list",
    json: primarySecondary,
    category: "linksList",
  }),
];
