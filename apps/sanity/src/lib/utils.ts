import type { Page } from "@/generated/extracted-types";
import createImageUrlBuilder from "@sanity/image-url";

import config from "../config";

const imageBuilder = createImageUrlBuilder({
  projectId: config.sanity.projectId || "",
  dataset: config.sanity.dataset || "",
});

export const urlForImage = (source: Page["ogImage"]) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format").fit("max");
};

export function urlForOpenGraphImage(image: Page["ogImage"]) {
  return urlForImage(image)?.width(1200).height(627).fit("crop").url();
}

// should be moved to the package and imported from there
export function createTemplate({
  json,
  title,
  category,
  screenshot,
}: {
  json: any;
  title: string;
  category: string;
  screenshot: string;
}) {
  return {
    name: title,
    value: json,
    meta: {
      area: json._type,
      category,
      title,
      screenshot,
    },
  };
}
