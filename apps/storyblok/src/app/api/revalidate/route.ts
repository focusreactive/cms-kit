import { revalidateTag } from "next/cache";

import { SB_CACHE_VERSION_TAG } from "@/constants/cacheTags";

export async function POST(request: Request) {
  const body = await request.json();
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (!body || !secret) {
    return Response.json(
      { error: "No body or secret provided" },
      { status: 400 },
    );
  }

  if (secret !== process.env.SB_WEBHOOK_REVALIDATE_SECRET) {
    return Response.json({ error: "No secret provided" }, { status: 400 });
  }

  revalidateTag(SB_CACHE_VERSION_TAG);

  return Response.json({ revalidated: true, now: Date.now() });
}
