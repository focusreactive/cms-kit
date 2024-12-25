import type { Preset } from "@focus-reactive/sanity-plugin-cms-kit";

import { createTemplate } from "@/lib/utils";

import defaultTemplate from "./default.json";
import heroPreview from "./hero-preview.png";

export const heroTemplates: Preset[] = [
  createTemplate({
    title: "Hero default",
    json: defaultTemplate,
    category: "hero",
    screenshot: heroPreview.src,
  }),
];
