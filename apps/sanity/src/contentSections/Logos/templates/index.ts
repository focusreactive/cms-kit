import { createTemplate } from "@/lib/utils";

import defaultPreview from "./default-preview.png";
import defaultTemplate from "./default.json";

export const logosTemplates = [
  createTemplate({
    title: "Logos default",
    json: defaultTemplate,
    category: "logos",
    screenshot: defaultPreview.src,
  }),
];
