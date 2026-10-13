import { createTemplate } from "@/lib/utils";

import defaultPreview from "./default-preview.png";
import defaultTemplate from "./default.json";

export const featureColumnsTemplates = [
  createTemplate({
    title: "Three feature columns",
    json: defaultTemplate,
    category: "featureColumns",
    screenshot: defaultPreview.src,
  }),
];
