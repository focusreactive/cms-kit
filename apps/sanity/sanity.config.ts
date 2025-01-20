import { visionTool } from "@sanity/vision";
import { pages } from "@tinloof/sanity-studio";
import { defineConfig } from "sanity";
import { simplerColorInput } from "sanity-plugin-simpler-color-input";
// import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import config from "@/config";
import * as resolve from "@/lib/presentation/resolve";
import schemas from "@/lib/schemas";
import StudioLogo from "@/components/StudioLogo";

export default defineConfig({
  basePath: config.sanity.studioUrl,
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
  title: config.siteName,
  icon: StudioLogo,
  schema: {
    types: schemas,
  },
  plugins: [
    pages({
      previewUrl: {
        previewMode: {
          enable: "/api/draft",
        },
      },
      creatablePages: ["page"],
      resolve,
    }),
    // presentationTool({
    //   resolve,
    //   previewUrl: {
    //     previewMode: {
    //       enable: "/api/draft",
    //     },
    //   },
    // }),
    structureTool(),
    visionTool({ defaultApiVersion: config.sanity.apiVersion }),
    simplerColorInput(),
  ],
});
