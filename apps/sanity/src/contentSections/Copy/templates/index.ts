import type { Preset } from "@focus-reactive/sanity-plugin-cms-kit";

import { createTemplate } from "@/lib/utils";

import defaultPreview from "./default-preview.png";
import defaultTemplate from "./default.json";

export const copyTemplates: Preset[] = [
  createTemplate({
    title: "Text, cards grid and an image",
    json: defaultTemplate,
    category: "copy",
    screenshot: defaultPreview.src,
  }),
];
