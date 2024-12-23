import { revalidatePath, revalidateTag } from "next/cache";

import { SB_CACHE_VERSION_TAG } from "@/constants/cacheTags";

export async function POST(request: Request) {
  const data = await request.json();
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (!data || !secret) {
    return Response.json(
      { error: "No body or secret provided" },
      { status: 400 },
    );
  }

  if (secret !== process.env.SB_WEBHOOK_REVALIDATE_SECRET) {
    return Response.json({ error: "No secret provided" }, { status: 400 });
  }

  const correctSlug = data.full_slug === "home" ? "/" : `/${data.full_slug}`;

  console.log("full_slug", data.full_slug);
  console.log("correctSlug", correctSlug);

  revalidateTag(SB_CACHE_VERSION_TAG);
  revalidatePath(correctSlug);

  if (correctSlug.startsWith("/components/")) {
    const response = await fetch(process.env.VERCEL_REDEPLOY_HOOK_URL!, {
      method: "POST",
    });

    console.log("trigger redeploy 🧚🏻");
    console.log(response.status, response.statusText);
    console.log(await response.json());
  }

  return Response.json({ revalidated: true, now: Date.now() });
}
