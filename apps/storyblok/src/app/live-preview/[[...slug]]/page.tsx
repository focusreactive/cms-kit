import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryblokStory } from "@storyblok/react/rsc";

import { fetchStory, fetchStoryMetadata } from "@/lib/storyblok";
import CoreLayout from "@/components/CoreLayout";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  return fetchStoryMetadata("draft", params.slug);
}

export async function generateStaticParams() {
  return [];
}

export default async function Home(props: Props) {
  const params = await props.params;
  const {
    data: { story, links },
  } = await fetchStory("draft", params.slug);

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
