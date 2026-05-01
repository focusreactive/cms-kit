import { storyblokEditable } from "@storyblok/react/rsc";

import EmptyBlock from "@shared/ui/components/EmptyBlock";
import type { BlogStyle } from "@shared/ui/components/sections/blog/types";

import { BlogSection as BlogSectionUI } from "@shared/ui";

import { prepareImageProps } from "@/lib/adapters/prepareImageProps";
import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import { prepareRichTextProps } from "@/lib/adapters/prepareRichTextProps";
import SectionContainer from "@/components/SectionContainer";

import type { IBlogProps } from "./types";

export default function Blog({ blok }: IBlogProps) {
  const { text, posts, style, section, _uid } = blok;

  if (posts.length === 0 && text.length === 0)
    return <EmptyBlock name={blok.component as string} />;

  const formattedPosts = posts.map((post) => ({
    style: style as BlogStyle,
    text: prepareRichTextProps(post.text[0]),
    image: prepareImageProps(post.image[0]),
    link: prepareLinkProps(post.link[0]),
  }));

  return (
    <SectionContainer
      sectionData={section?.[0]}
      id={_uid}
      editableAttrs={storyblokEditable(blok)}
    >
      <BlogSectionUI
        text={prepareRichTextProps(text[0])}
        posts={formattedPosts}
        style={style as BlogStyle}
      />
    </SectionContainer>
  );
}
