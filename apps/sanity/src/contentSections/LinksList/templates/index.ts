import { createTemplate } from "@/lib/utils";

import defaultPreview from "./default-preview.png";
import defaultTemplate from "./default.json";

export const linksListTemplates = [
  createTemplate({
    title: "Two links list",
    json: defaultTemplate,
    category: "linksList",
    screenshot: defaultPreview.src,
  }),
];
