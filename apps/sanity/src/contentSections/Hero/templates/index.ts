import type { Preset } from "@focus-reactive/sanity-plugin-cms-kit";

import { createTemplate } from "@/lib/utils";

import defaultPreview from "./default-preview.png";
import defaultTemplate from "./default.json";

export const heroTemplates: Preset[] = [
  createTemplate({
    title: "Hero default",
    json: defaultTemplate,
    category: "hero",
    screenshot: defaultPreview.src,
  }),
];
