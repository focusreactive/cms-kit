import type { Preset } from "@focus-reactive/sanity-plugin-cms-kit";

import { createTemplate } from "@/lib/utils";

import defaultPreview from "./default-preview.png";
import defaultTemplate from "./default.json";

export const linksListTemplates: Preset[] = [
  createTemplate({
    title: "Two links list",
    json: defaultTemplate,
    category: "linksList",
    screenshot: defaultPreview.src,
  }),
];
