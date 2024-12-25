import type { Preset } from "@focus-reactive/sanity-plugin-cms-kit";

import { createTemplate } from "@/lib/utils";

import defaultPreview from "./default-preview.png";
import defaultTemplate from "./default.json";

export const logosTemplates: Preset[] = [
  createTemplate({
    title: "1212121212 Logos default",
    json: defaultTemplate,
    category: "logos",
    screenshot: defaultPreview.src,
  }),
];
