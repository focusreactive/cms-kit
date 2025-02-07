import { createTemplate } from "@/lib/utils";

import defaultPreview from "./default-preview.png";
import defaultTemplate from "./default.json";

export const heroTemplates = [
  createTemplate({
    title: "Hero default",
    json: defaultTemplate,
    category: "hero",
    screenshot: defaultPreview.src,
  }),
];
