import { StoryblokComponent, StoryblokStory } from "@storyblok/react/rsc";

import { cn, CookieBanner } from "@shared/ui";

import { useGlobalComponentData } from "@/lib/hooks/useGlobalComponentData";

import type { IPageContainerProps } from "./types";

export default function PageContainer({ blok }: IPageContainerProps) {
  const globalHeader = useGlobalComponentData(blok.header as string);
  const globalFooter = useGlobalComponentData(blok.footer as string);

  const { sections, showCookieBanner, theme } = blok;

  if (!sections) return null;

  console.log(blok);
  console.log("globalHeader");
  console.log(blok.header);
  console.log("globalFooter");
  console.log(blok.header);

  return (
    <div className={cn("bg-bgColor", theme)}>
      {globalHeader && <StoryblokStory story={globalHeader} />}
      {sections.map((s) => (
        <StoryblokComponent blok={s} key={s._uid} />
      ))}
      {globalFooter && <StoryblokStory story={globalFooter} />}
      {showCookieBanner && <CookieBanner />}
    </div>
  );
}
