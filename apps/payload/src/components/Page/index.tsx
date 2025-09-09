// "use client";

import { cn } from "@shared/ui";

import { RenderBlocks } from "../blocks/RenderBlocks";
// TO-DO: fix LivePreview
// import { LivePreviewListener } from "../LivePreviewListener";
import type { IPageContainerProps } from "./types";

export default function PageContainer({ page, isDraft }: IPageContainerProps) {
  // TO-DO: add theme support
  const theme = "";
  // const { theme } = useTheme();

  const { layout } = page;

  if (!layout) return null;

  return (
    <div className={cn("bg-bgColor", theme)}>
      {/* {isDraft && <LivePreviewListener />} */}
      <RenderBlocks blocks={layout} />
    </div>
  );
}
