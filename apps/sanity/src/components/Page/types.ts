import type { Footer, Header, Page } from "@/generated/extracted-types";

export interface IPageWithReference extends Omit<Page, "header" | "footer"> {
  header: Header & { _key: string };
  footer: Footer & { _key: string };
}

export interface IPageProps {
  data: IPageWithReference | null;
}
