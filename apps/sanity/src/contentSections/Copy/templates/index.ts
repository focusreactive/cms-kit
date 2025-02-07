import { createTemplate } from "@/lib/utils";

import defaultPreview from "./default-preview.png";
import defaultTemplate from "./default.json";

export const copyTemplates = [
  createTemplate({
    title: "Text, cards grid and an image",
    json: defaultTemplate,
    category: "copy",
    screenshot: defaultPreview.src,
  }),
];
