import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryblokStory } from "@storyblok/react/rsc";

import {
  checkDraftModeToken,
  fetchAllPages,
  fetchStoryBySlug,
  getMetaData,
} from "@/lib/api";
import CoreLayout from "@/components/CoreLayout";

const isDraftModeEnv = process.env.NEXT_PUBLIC_IS_PREVIEW === "true";
export const dynamic = isDraftModeEnv ? "force-dynamic" : "force-static";

type Props = {
  params: { slug?: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return await getMetaData(params.slug);
}

export async function generateStaticParams() {
  if (isDraftModeEnv) return [];

  const pages = await fetchAllPages();

  const paths = pages
    .filter((page) => page.is_folder === false)
    .map((page) => {
      return {
        slug: page.slug.split("/"),
      };
    });

  return paths;
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
