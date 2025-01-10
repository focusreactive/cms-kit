import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryblokStory } from "@storyblok/react/rsc";

import { checkDraftModeToken, fetchStoryBySlug, getMetaData } from "@/lib/api";
import CoreLayout from "@/components/CoreLayout";

type Props = {
  params: { slug?: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return await getMetaData(params.slug);
}

export async function generateStaticParams() {
  return [];
}

export default async function Home({ params, searchParams }: Props) {
  const isDraftModeEnabled = await checkDraftModeToken(searchParams);

  const { story, links } = await fetchStoryBySlug(
    isDraftModeEnabled,
    params.slug,
  );

  if (!story) {
    notFound();
  }

  return (
    <CoreLayout allResolvedLinks={links}>
      <StoryblokStory story={story} />
    </CoreLayout>
  );
}
