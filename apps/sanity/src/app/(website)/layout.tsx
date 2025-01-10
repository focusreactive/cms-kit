import { type PropsWithChildren } from "react";
import type { Viewport } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";

import { SanityLive } from "@/lib/live";

// TODO: add global metadata
// export async function generateMetadata(): Promise<Metadata> {
//   const [{ data: settings }, { data: homePage }] = await Promise.all([
//     loadSettings(),
//     loadHomePage(),
//   ])
//
//   const ogImage = urlForOpenGraphImage(settings?.ogImage)
//   return {
//     title: homePage?.title
//       ? {
//         template: `%s | ${homePage.title}`,
//         default: homePage.title || 'Personal website',
//       }
//       : undefined,
//     description: homePage?.overview
//       ? toPlainText(homePage.overview)
//       : undefined,
//     openGraph: {
//       images: ogImage ? [ogImage] : [],
//     },
//   }
// }

export const viewport: Viewport = {
  themeColor: "#000",
};

export default async function IndexRoute({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <SanityLive />
      {(await draftMode()).isEnabled && <VisualEditing />}
    </>
  );
}
