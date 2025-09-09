import type { Metadata } from "next";
import type { Page } from "@/generated/payload-types";

import { mergeOpenGraph } from "./mergeOpenGraph";

export const generateMeta = async (args: {
  doc: Partial<Page> | null;
}): Promise<Metadata> => {
  const { doc } = args;

  const title = doc?.meta?.title
    ? doc?.meta?.title + " | Payload Template"
    : "Payload Template";

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || "",
      images: undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/",
    }),
    title,
  };
};
