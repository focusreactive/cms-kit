import type { Metadata } from "next";

import Studio from "./Studio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "CMS-Kit Boilerplate",
};

export default function StudioPage() {
  return <Studio />;
}
