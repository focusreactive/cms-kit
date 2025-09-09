import React, { cache } from "react";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { getPayload } from "payload";

import configPromise from "@/lib/payload/payload.config";
import { generateMeta } from "@/lib/utilities/generateMeta";
import PageContainer from "@/components/Page";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== "home";
    })
    .map(({ slug }) => {
      return { slug };
    });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();

  const { slug = "home" } = await paramsPromise;
  const url = "/" + slug;

  const page = await queryPageBySlug({
    slug,
  });

  if (!page) {
    return (
      <div>
        <h1>EMPTY</h1>
      </div>
    );
  }

  return <PageContainer page={page} isDraft={draft} />;
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = "home" } = await paramsPromise;
  const page = await queryPageBySlug({
    slug,
  });

  return generateMeta({ doc: page });
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "pages",
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});
