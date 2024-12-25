import plugin from "tailwindcss/plugin";
import { type PluginAPI } from "tailwindcss/types/config";

// todo: consider implementing themes feature using CSS variables
export const customPlugin = plugin(
  // 1. Add CSS variable definitions to the base layer
  function ({ addUtilities }: PluginAPI) {
    addUtilities({
      ".mask-shadow-y": {
        maskImage:
          "linear-gradient(90deg, transparent, #fff 10%, #fff 90%, transparent)",
      },
    });
  },

  // 2. Extend the Tailwind theme with "themable" utilities
  {
    theme: {
      extend: {
        typography: {
          DEFAULT: {
            css: {
              "--tw-prose-headings": `var("--text")`,
              "--tw-prose-invert-headings": `var("--text")`,
            },
          },
        },
        colors: {
          primary: {
            "50": "#eff6ff",
            "100": "#dbeafe",
            "200": "#bfdbfe",
            "300": "#93c5fd",
            "400": "#60a5fa",
            "500": "#3b82f6",
            "600": "#2563eb",
            "700": "#1d4ed8",
            "800": "#1e40af",
            "900": "#1e3a8a",
            "950": "#172554",
          },
        },
      },
      fontFamily: {
        body: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
);
