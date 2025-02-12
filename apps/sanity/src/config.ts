const config = {
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
    // Not exposed to the front-end, used solely by the server
    token: process.env.NEXT_PUBLIC_SANITY_READ_TOKEN || "",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-06-21",
    // revalidateSecret: process.env.SANITY_REVALIDATE_SECRET || "",
    studioUrl: "/studio",
  },
  siteName: "CMS-Kit",
  siteDomain: process.env.NEXT_PUBLIC_DOMAIN || "",
  baseUrl: process.env.NEXT_PUBLIC_DOMAIN || "",
};

export default config;
