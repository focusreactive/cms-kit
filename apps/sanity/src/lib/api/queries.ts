import { BLOG_FRAGMENT } from "@/contentSections/Blog/query";
import { CARDS_GRID_FRAGMENT } from "@/contentSections/CardsGrid/query";
import { HERO_FRAGMENT } from "@/contentSections/Hero/query";
import { LINKS_LIST_FRAGMENT } from "@/contentSections/LinksList/query";
import { LOGOS_FRAGMENT } from "@/contentSections/Logos/query";
import { groq } from "next-sanity";

import { FOOTER_FRAGMENT } from "@/components/Footer/query";
import { HEADER_FRAGMENT } from "@/components/Header/query";

export const PAGE_BY_SLUG_QUERY = groq`
  *[_type == "page" && pathname.current == $slug][0] {
    _id,
    header->{
      ${HEADER_FRAGMENT}
    },
    sectionsBody[] {
      ...,
      _type == "section.hero" => { ${HERO_FRAGMENT} },
      _type == "section.linksList" => { ${LINKS_LIST_FRAGMENT} },
      _type == "section.cardsGrid" => { ${CARDS_GRID_FRAGMENT} },
      _type == "section.logos" => { ${LOGOS_FRAGMENT} },
      _type == "section.blog" => { ${BLOG_FRAGMENT} },
    },
    footer->{
      ${FOOTER_FRAGMENT}
    },
    title,
    "slug": pathname.current,

    seoTitle,
    seoDescription,
    ogImage,
    robots,
    theme,
  }
`;
