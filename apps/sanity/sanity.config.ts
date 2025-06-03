import { visionTool } from "@sanity/vision";
import { pages } from "@tinloof/sanity-studio";
import { defineConfig } from "sanity";
import { simplerColorInput } from "sanity-plugin-simpler-color-input";
// import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import * as resolve from "@/lib/presentation/resolve";
import schemas from "@/lib/schemas";
import StudioLogo from "@/components/StudioLogo";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-projectID";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "CMS-Kit",
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
    visionTool(),
    simplerColorInput(),
  ],
});
