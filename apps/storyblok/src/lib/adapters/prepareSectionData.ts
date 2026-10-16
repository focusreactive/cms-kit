import type {
  AssetStoryblok,
  SectionSettingsStoryblok,
} from "@/generated/extracted-types";

export interface ISectionBackground {
  media?: AssetStoryblok | null;
  overlay?: "black" | "white" | null;
  opacity?: number | null;
}

export interface ISectionData {
  id?: string | null;
  theme?: "light" | "dark" | "light-gray" | "dark-gray" | null;
  paddingY?: "none" | "base" | "large" | null;
  paddingX?: "none" | "base" | null;
  maxWidth?: "none" | "base" | null;
  background?: ISectionBackground;
}

export const prepareSectionData = (
  settings?: SectionSettingsStoryblok,
  id?: string,
): ISectionData => {
  const { theme, paddingY, paddingX, maxWidth, media, overlay, opacity } =
    settings ?? {};

  return {
    id,
    theme: theme || null,
    paddingY: paddingY || null,
    paddingX: paddingX || null,
    maxWidth: maxWidth || null,
    background: {
      media: media?.filename ? media : null,
      overlay: overlay || null,
      opacity: opacity ? Number(opacity) : null,
    },
  };
};
