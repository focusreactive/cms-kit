import type { ImageStoryblok } from "@/generated/extracted-types";
import { StoryblokComponent } from "@storyblok/react";
import { type ISbRichtext } from "@storyblok/react/rsc";
import { render } from "storyblok-rich-text-react-renderer";

import { Image } from "@shared/ui";

import { prepareImageProps } from "./adapters/prepareImageProps";

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
          <StoryblokComponent
            blok={{
              ...props,
              component: "cardsGrid",
              paddingX: "none",
            }}
          />
        );
      },

      linksList: (props) => {
        return (
          <StoryblokComponent
            blok={{
              ...props,
              component: "linksList",
              paddingX: "none",
            }}
          />
        );
      },

      logos: (props) => {
        return (
          <StoryblokComponent
            blok={{
              ...props,
              component: "logos",
              paddingX: "none",
            }}
          />
        );
      },

      carousel: (props) => {
        return (
          <StoryblokComponent
            blok={{ ...props, component: "carousel", paddingX: "none" }}
          />
        );
      },
    },
  });
}
