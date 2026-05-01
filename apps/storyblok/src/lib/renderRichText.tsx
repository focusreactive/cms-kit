import type { ImageStoryblok } from "@/generated/extracted-types";
import {
  StoryblokServerComponent,
  type ISbRichtext,
} from "@storyblok/react/rsc";
import { render } from "storyblok-rich-text-react-renderer";

import { Image } from "@shared/ui";

import { prepareImageProps } from "./adapters/prepareImageProps";

const richTextSectionOverride = [
  {
    _uid: "richtext-section",
    component: "sectionSettings" as const,
    paddingX: "none",
    paddingY: "none",
    maxWidth: "none",
  },
];

export default function renderRichText(data: ISbRichtext) {
  return render(data, {
    markResolvers: {},
    nodeResolvers: {},
    blokResolvers: {
      image: (props) => {
        return (
          <div
            className="relative mx-auto"
            style={{
              aspectRatio: props.aspectRatio as string,
            }}
          >
            <Image
              {...prepareImageProps({
                ...(props as ImageStoryblok),
              })}
            />
          </div>
        );
      },

      cardsGrid: (props) => {
        return (
          <StoryblokServerComponent
            blok={{
              ...props,
              component: "cardsGrid",
              section: richTextSectionOverride,
            }}
          />
        );
      },

      linksList: (props) => {
        return (
          <StoryblokServerComponent
            blok={{
              ...props,
              component: "linksList",
              section: richTextSectionOverride,
            }}
          />
        );
      },

      logos: (props) => {
        return (
          <StoryblokServerComponent
            blok={{
              ...props,
              component: "logos",
              section: richTextSectionOverride,
            }}
          />
        );
      },

      carousel: (props) => {
        return (
          <StoryblokServerComponent
            blok={{
              ...props,
              component: "carousel",
              section: richTextSectionOverride,
            }}
          />
        );
      },
    },
  });
}
