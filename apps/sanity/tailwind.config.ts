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
