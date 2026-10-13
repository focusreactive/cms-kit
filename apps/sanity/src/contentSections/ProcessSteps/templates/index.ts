import { createTemplate } from "@/lib/utils";

import defaultPreview from "./default-preview.png";
import defaultTemplate from "./default.json";

export const processStepsTemplates = [
  createTemplate({
    title: "Numbered process steps",
    json: defaultTemplate,
    category: "processSteps",
    screenshot: defaultPreview.src,
  }),
];
