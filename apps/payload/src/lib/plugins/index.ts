import { Page } from "@/generated/payload-types";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { Plugin } from "payload";

import { getServerSideURL } from "@/lib/utilities/getURL";

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Template` : "Payload Template";
};

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  payloadCloudPlugin(),
];
