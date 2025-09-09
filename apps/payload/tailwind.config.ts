import sharedConfig from "@shared/tailwind-config";
import { preset } from "@shared/tailwind-config/lib/preset";
import type { Config } from "tailwindcss";

const config: Config = {
  ...sharedConfig,
  theme: {
    extend: {
      colors: {
        bgColor: "var(--bg)",
        textColor: "var(--text)",
        textSecondaryColor: "var(--text-secondary)",
        primaryColor: "var(--primary)",
        primaryLightColor: "var(--primary-light)",
        primary2Color: "var(--primary-2)",
        primary2LightColor: "var(--primary-2-light)",
      },
      margin: {
        sectionBase: "var(--section-margin-base)",
        sectionLarge: "var(--section-margin-large)",
      },
      padding: {
        sectionBase: "var(--section-padding-base)",
        sectionLarge: "var(--section-padding-large)",
      },
    },
  },
  presets: [preset],
};

export default config;
