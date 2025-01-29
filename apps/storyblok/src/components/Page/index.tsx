"use client";

import { StoryblokServerComponent, StoryblokStory } from "@storyblok/react/rsc";

import { cn, CookieBanner } from "@shared/ui";

import { useGlobalComponentData } from "@/lib/hooks/useGlobalComponentData";

import type { IPageContainerProps } from "./types";

export default function PageContainer({ blok }: IPageContainerProps) {
  const globalHeader = useGlobalComponentData(blok.header as string);
  const globalFooter = useGlobalComponentData(blok.footer as string);

  const { sections, showCookieBanner, theme } = blok;

  if (!sections) return null;

  return (
    <div className={cn("bg-bgColor", theme)}>
      {globalHeader && <StoryblokStory story={globalHeader} />}
      {sections.map((s, i) => (
        <StoryblokServerComponent blok={s} key={s._uid + i} />
      ))}
      {globalFooter && <StoryblokStory story={globalFooter} />}
      {showCookieBanner && <CookieBanner />}
    </div>
  );
}
