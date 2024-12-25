import { SectionRenderer } from "@/contentSections";

import { cn, CookieBanner } from "@shared/ui";

import Footer from "../Footer";
import Header from "../Header";
import type { IPageProps } from "./types";

export default function Page({ data }: IPageProps) {
  if (!data) return null;

  const { sectionsBody, showCookieBanner, header, footer, theme } = data;

  return (
    <div className={cn("bg-bgColor", theme)}>
      <Header data={header} />
      {sectionsBody?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
      {showCookieBanner && <CookieBanner />}
      <Footer data={footer} />
    </div>
  );
}
