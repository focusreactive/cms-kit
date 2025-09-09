import type { Metadata } from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  description: "An open-source website built with Payload and Next.js.",
  images: undefined,
  siteName: "Payload Template",
  title: "Payload Template",
};

export const mergeOpenGraph = (
  og?: Metadata["openGraph"],
): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: undefined,
  };
};
