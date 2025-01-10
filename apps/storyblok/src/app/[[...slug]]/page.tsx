import { notFound } from "next/navigation";
import { StoryblokStory } from "@storyblok/react/rsc";

import { fetchStory, fetchStoryMetadata } from "@/lib/storyblok";
import CoreLayout from "@/components/CoreLayout";

export async function generateMetadata(props: Props) {
  const params = await props.params;

  return fetchStoryMetadata("published", params.slug);
}

export async function generateStaticParams() {
  return [];
}

export default async function DynamicPage(props: Props) {
  const params = await props.params;
  const {
    data: { story, links },
  } = await fetchStory("published", params.slug);

  if (!story) {
    notFound();
  }

  return (
    <CoreLayout version="published" allResolvedLinks={links}>
      <StoryblokStory story={story} />
    </CoreLayout>
  );
}

type Props = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
