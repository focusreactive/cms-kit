import { type Metadata } from "next";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { generateStaticSlugs } from "@/lib/loader/generateStaticSlugs";
import { loadPage } from "@/lib/loader/loadQuery";
import { urlForOpenGraphImage } from "@/lib/utils";
import Page from "@/components/Page";

const PagePreview = dynamic(() => import("@/components/Page/PagePreview"));

type Props = {
  params: Promise<{ slug: string[] | undefined }>;
};

const getSlug = (params: { slug: string[] | undefined }) => {
  // TODO: check why this happens
  if (params.slug?.[0] === "_next") return null;

  return params.slug ? `/${params.slug.join("/")}` : "/";
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const slug = getSlug(params);

  if (!slug) {
    return {};
  }

  const { data: page } = await loadPage(slug);

  const ogImage = urlForOpenGraphImage(page?.ogImage);
  const openGraph: OpenGraph = {
    title: page?.seoTitle,
    description: page?.seoDescription,
    images: ogImage ? [ogImage] : [],
  };

  const canonical = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN as string}${slug === "/" ? "" : slug}`,
  ).toString();

  return {
    alternates: {
      canonical,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN as string),
    title: page?.seoTitle,
    description: page?.seoDescription,
    openGraph,
    // keywords: page?.seoKeywords,
    robots: page?.robots === "index" ? { index: true } : { index: false },
  };
}

export async function generateStaticParams() {
  return generateStaticSlugs("page");
}

export default async function PageSlugRoute(props: Props) {
  const params = await props.params;
  const slug = getSlug(params);

  if (!slug) {
    notFound();
  }

  const initial = await loadPage(slug);

  if ((await draftMode()).isEnabled) {
    return <PagePreview params={{ slug }} initial={initial} />;
  }

  if (!initial.data) {
    notFound();
  }

  return <Page data={initial.data} />;
}
