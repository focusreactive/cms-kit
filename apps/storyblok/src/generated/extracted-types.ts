// This file was generated by the storyblok CLI.
// DO NOT MODIFY THIS FILE BY HAND.
import type { ISbStoryData } from "storyblok";
export interface AssetStoryblok {
  alt: string | null;
  copyright?: string | null;
  fieldtype: "asset";
  id: number;
  filename: string | null;
  name: string;
  title: string | null;
  focus: string | null;
  meta_data?: {
    [k: string]: any;
  };
  source?: string | null;
  is_external_url?: boolean;
  is_private?: boolean;
  src?: string;
  updated_at?: string;
  width?: number | null;
  height?: number | null;
  aspect_ratio?: number | null;
  public_id?: string | null;
  content_type?: string;
  [k: string]: any;
}

export interface BlogStoryblok {
  style: "three-column" | "three-column-with-images" | "three-column-with-background-images";
  text: RichTextStoryblok[];
  posts: BlogPostStoryblok[];
  marginTop: "none" | "base" | "lg";
  marginBottom: "none" | "base" | "lg";
  maxWidth: "base" | "none" | "small";
  backgroundColor: "light" | "light-gray" | "dark-gray" | "dark" | "none";
  backgroundImage?: AssetStoryblok;
  component: "blog";
  _uid: string;
  [k: string]: any;
}

export interface BlogPostStoryblok {
  date: string;
  link: LinkStoryblok[];
  image: ImageStoryblok[];
  text: RichTextStoryblok[];
  component: "blogPost";
  _uid: string;
  [k: string]: any;
}

export interface CardsGridStoryblok {
  columns: "1" | "2" | "3";
  marginTop: "none" | "base" | "lg";
  marginBottom: "none" | "base" | "lg";
  maxWidth: "base" | "none" | "small";
  backgroundColor: "light" | "light-gray" | "dark-gray" | "dark" | "none";
  items: DefaultCardStoryblok[];
  backgroundImage?: AssetStoryblok;
  component: "cardsGrid";
  _uid: string;
  [k: string]: any;
}

export interface CarouselStoryblok {
  slidesPerView: string;
  slides: CarouselSlideStoryblok[];
  effect?: "slide" | "coverflow" | "cube" | "fade" | "flip" | "cards";
  loop?: boolean;
  marginTop: "none" | "base" | "lg";
  marginBottom: "none" | "base" | "lg";
  maxWidth: "base" | "none" | "small";
  backgroundColor: "light" | "light-gray" | "dark-gray" | "dark" | "none";
  backgroundImage?: AssetStoryblok;
  component: "carousel";
  _uid: string;
  [k: string]: any;
}

export interface CarouselSlideStoryblok {
  text?: RichTextStoryblok[];
  image: ImageStoryblok[];
  component: "carouselSlide";
  _uid: string;
  [k: string]: any;
}

export interface CopyStoryblok {
  isReversedOnMobile?: boolean;
  columns: RichTextStoryblok[];
  marginTop: "none" | "base" | "lg";
  marginBottom: "none" | "base" | "lg";
  maxWidth: "base" | "none" | "small";
  backgroundColor: "light" | "light-gray" | "dark-gray" | "dark" | "none";
  backgroundImage?: AssetStoryblok;
  component: "copy";
  _uid: string;
  [k: string]: any;
}

export interface DefaultCardStoryblok {
  image?: ImageStoryblok[];
  title: string;
  description?: string;
  link?: LinkStoryblok[];
  alignVariant: "left" | "center" | "right";
  backgroundColor: "light" | "light-gray" | "dark-gray" | "dark" | "none";
  rounded: "large" | "none";
  component: "defaultCard";
  _uid: string;
  [k: string]: any;
}

export interface FooterStoryblok {
  image: ImageStoryblok[];
  text?: RichTextStoryblok[];
  links: LinkStoryblok[];
  copywriteText?: string;
  component: "footer";
  _uid: string;
  [k: string]: any;
}

export interface HeaderStoryblok {
  image: ImageStoryblok[];
  links: LinkStoryblok[];
  alignVariant: "left" | "center" | "right";
  component: "header";
  _uid: string;
  [k: string]: any;
}

export interface HeroStoryblok {
  globalData?: ISbStoryData<HeroStoryblok> | string;
  title?: string;
  text?: RichTextStoryblok[];
  image: ImageStoryblok[];
  links: LinkStoryblok[];
  marginTop: "none" | "base" | "lg";
  marginBottom: "none" | "base" | "lg";
  maxWidth: "base" | "none" | "small";
  backgroundColor: "light" | "light-gray" | "dark-gray" | "dark" | "none";
  backgroundImage?: AssetStoryblok;
  component: "hero";
  _uid: string;
  [k: string]: any;
}

export interface ImageStoryblok {
  asset: AssetStoryblok;
  aspectRatio: "16/9" | "3/2" | "4/3" | "1/1" | "9/16" | "1/2" | "4/1" | "3/1" | "auto";
  component: "image";
  _uid: string;
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      fieldtype: "multilink";
      id: string;
      url: string;
      cached_url: string;
      target?: "_blank" | "_self";
      anchor?: string;
      rel?: string;
      title?: string;
      prep?: string;
      linktype: "story";
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: any;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: any;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: any[];
        default_full_slug?: null | string;
        translated_slugs?: null | any[];
        [k: string]: any;
      };
      [k: string]: any;
    }
  | {
      fieldtype: "multilink";
      id: string;
      url: string;
      cached_url: string;
      target?: "_blank" | "_self";
      linktype: "url";
      rel?: string;
      title?: string;
      [k: string]: any;
    }
  | {
      fieldtype: "multilink";
      id: string;
      url: string;
      cached_url: string;
      target?: "_blank" | "_self";
      email?: string;
      linktype: "email";
      [k: string]: any;
    }
  | {
      fieldtype: "multilink";
      id: string;
      url: string;
      cached_url: string;
      target?: "_blank" | "_self";
      linktype: "asset";
      [k: string]: any;
    };

export interface LinkStoryblok {
  size: "base" | "sm" | "lg";
  variant: "default" | "primary" | "secondary" | "badge" | "ghost" | "ghost-dark";
  text: string;
  link: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  component: "link";
  _uid: string;
  [k: string]: any;
}

export interface LinksListStoryblok {
  alignVariant: "left" | "center" | "right";
  links: LinkStoryblok[];
  marginTop: "none" | "base" | "lg";
  marginBottom: "none" | "base" | "lg";
  maxWidth: "base" | "none" | "small";
  backgroundColor: "light" | "light-gray" | "dark-gray" | "dark" | "none";
  backgroundImage?: AssetStoryblok;
  component: "linksList";
  _uid: string;
  [k: string]: any;
}

export interface LogoItemStoryblok {
  type: "logo" | "clickableLogo";
  image: ImageStoryblok[];
  link?: LinkStoryblok[];
  component: "logoItem";
  _uid: string;
  [k: string]: any;
}

export interface LogosStoryblok {
  alignVariant: "left" | "center" | "right";
  items: LogoItemStoryblok[];
  marginTop: "none" | "base" | "lg";
  marginBottom: "none" | "base" | "lg";
  maxWidth: "base" | "none" | "small";
  backgroundColor: "light" | "light-gray" | "dark-gray" | "dark" | "none";
  backgroundImage?: AssetStoryblok;
  component: "logos";
  _uid: string;
  [k: string]: any;
}

export interface PageStoryblok {
  header: ISbStoryData<HeaderStoryblok> | string;
  sections: (
    | BlogStoryblok
    | CardsGridStoryblok
    | CarouselStoryblok
    | CopyStoryblok
    | HeroStoryblok
    | LinksListStoryblok
    | LogosStoryblok
  )[];
  seoTitle: string;
  seoDescription: string;
  ogImage?: AssetStoryblok;
  robots: "index" | "no-index";
  showCookieBanner?: boolean;
  footer: ISbStoryData<FooterStoryblok> | string;
  theme: "light" | "dark";
  component: "page";
  _uid: string;
  [k: string]: any;
}

export interface PricingTableExtraServiceStoryblok {
  text: string;
  cost: string;
  component: "pricingTableExtraService";
  _uid: string;
  [k: string]: any;
}

export interface PricingTableTierStoryblok {
  name: string;
  icon: ImageStoryblok[];
  price?: string;
  description: string;
  features: PricingTableTierFeatureStoryblok[];
  link: LinkStoryblok[];
  popular?: boolean;
  component: "pricingTableTier";
  _uid: string;
  [k: string]: any;
}

export interface PricingTableTierFeatureStoryblok {
  text: string;
  component: "pricingTableTierFeature";
  _uid: string;
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface RichTextStoryblok {
  alignVariant: "left" | "center" | "right";
  removeInnerMargins?: boolean;
  content: RichtextStoryblok;
  component: "richText";
  _uid: string;
  [k: string]: any;
}

export interface StepGuideItemStoryblok {
  number: string;
  text: string;
  image: ImageStoryblok[];
  component: "stepGuideItem";
  _uid: string;
  [k: string]: any;
}
