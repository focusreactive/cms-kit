// @ts-nocheck
import { createTemplate } from "@/lib/templateSelectorInput/createTemplate";

import withImage from "./with-images.json";
import withoutImage from "./without-images.json";

export const blogTemplates = [
  createTemplate({
    name: "withImages",
    title: "Blog section with images",
    description: "desc1",
    json: withImage,
    category: "blog",
    template: withImage,
  }),
  createTemplate({
    name: "withoutImages",
    title: "Blog section without images",
    description: "desc2",
    json: withoutImage,
    category: "blog",
    template: withoutImage,
  }),
];
