import { type Metadata } from "next";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { notFound } from "next/navigation";
import type { Page as PageType } from "@/generated/extracted-types";

import { PAGE_BY_SLUG_QUERY } from "@/lib/api/queries";
import { sanityFetch } from "@/lib/live";
import { generateStaticSlugs } from "@/lib/loader/generateStaticSlugs";
import { urlForOpenGraphImage } from "@/lib/utils";
import Page from "@/components/Page";
import type { IPageWithReference } from "@/components/Page/types";

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

  const { data: page } = await sanityFetch({
    query: PAGE_BY_SLUG_QUERY,
    params: { slug },
  });

  const typedPage = page as unknown as PageType;

  const ogImage = urlForOpenGraphImage(typedPage?.ogImage);
  const openGraph: OpenGraph = {
    title: typedPage?.seoTitle,
    description: typedPage?.seoDescription,
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
    title: typedPage?.seoTitle,
    description: typedPage?.seoDescription,
    openGraph,
    robots: typedPage?.robots === "index" ? { index: true } : { index: false },
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

  const { data: page } = await sanityFetch({
    query: PAGE_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!page) {
    notFound();
  }

  return <Page data={page as unknown as IPageWithReference} />;
}
