import type { Preset } from "@focus-reactive/sanity-template-selector";

import { createTemplate } from "@/lib/utils";

import defaultPreview from "./default-preview.png";
import defaultTemplate from "./default.json";

export const logosTemplates: Preset[] = [
  createTemplate({
    title: "Logos default",
    json: defaultTemplate,
    category: "logos",
    screenshot: defaultPreview.src,
  }),
];
