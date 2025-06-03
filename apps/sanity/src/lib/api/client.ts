import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, studioUrl } from "@/lib/config";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // TODO: check this
  // If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
  // useCdn: revalidateSecret ? false : true,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  stega: {
    studioUrl,
    filter: (props) => {
      const excluded = ["seoTitle", "seoDescription", "robots"];
      const fieldName = props.sourcePath.at(-1);
      if (typeof fieldName === "string" && excluded.includes(fieldName)) {
        return false;
      }

      return props.filterDefault(props);
    },
  },
});
