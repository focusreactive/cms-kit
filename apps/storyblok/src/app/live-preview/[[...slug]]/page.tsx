import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryblokStory } from "@storyblok/react/rsc";

import { splitLanguageFromSlug } from "@/constants/languages";
import {
  fetchLanguageCodes,
  fetchStory,
  fetchStoryMetadata,
} from "@/lib/storyblok";
import CoreLayout from "@/components/CoreLayout";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { language, slug } = splitLanguageFromSlug(
    params.slug,
    await fetchLanguageCodes(),
  );

  return fetchStoryMetadata("draft", slug, language);
}

export default async function Home(props: Props) {
  const params = await props.params;
  const { language, slug } = splitLanguageFromSlug(
    params.slug,
    await fetchLanguageCodes(),
  );
  const {
    data: { story, links },
  } = await fetchStory("draft", slug, language);

  if (!story || process.env.NEXT_PUBLIC_IS_PREVIEW !== "true") {
    notFound();
  }

  return (
    <CoreLayout version="draft" allResolvedLinks={links}>
      <StoryblokStory story={story} />
    </CoreLayout>
  );
}

type Props = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
