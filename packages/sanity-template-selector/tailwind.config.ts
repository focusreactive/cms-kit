import sharedConfig from "@shared/tailwind-config";
import { preset } from "@shared/tailwind-config/lib/preset";
import type { Config } from "tailwindcss";

const config: Config = {
  ...sharedConfig,
  presets: [preset],
};

export default config;
