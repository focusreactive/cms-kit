import CardsGrid from "@/contentSections/CardsGrid";
import Carousel from "@/contentSections/Carousel";
import LinksList from "@/contentSections/LinksList";
import Logos from "@/contentSections/Logos";
import PricingTable from "@/contentSections/PricingTable";
import StepGuide from "@/contentSections/StepGuide";
import ThreeDElement from "@/contentSections/ThreeDElement";
import type { CustomImage } from "@/generated/extracted-types";
import { PortableText } from "@portabletext/react";
import { stegaClean } from "@sanity/client/stega";
import { ImageAspectRatio } from "@shared/ui/components/ui/image/types";

import { Image } from "@shared/ui";

import { prepareImageProps } from "./adapters/prepareImageProps";

export default function renderRichText(data: any[]) {
  return <PortableText value={data} components={COMPONENTS} />;
}

const COMPONENTS = {
  types: {
    // todo: infer from schema
    break: () => {
      return <hr className="border-textColor" />;
    },

    customImage: ({ value }: { value: CustomImage }) => {
      return (
        <div
          className="relative mx-auto"
          style={{
            aspectRatio:
              ImageAspectRatio[value.aspectRatio || ImageAspectRatio["1/1"]],
            height: value.height,
          }}
        >
          {value.image && <Image {...prepareImageProps(value)} />}
        </div>
      );
    },

    // todo: infer from schema
    "section.logos": ({ value }: { value: any }) => {
      return <Logos data={{ ...value, paddingX: "none" }} />;
    },
    // todo: infer from schema
    "section.cardsGrid": ({ value }: { value: any }) => {
      return <CardsGrid data={{ ...value, paddingX: "none" }} />;
    },

    // todo: infer from schema
    "section.linksList": ({ value }: { value: any }) => {
      return <LinksList data={{ ...value, paddingX: "none" }} />;
    },

    "section.stepGuide": ({ value }: { value: any }) => {
      return <StepGuide data={{ ...value, paddingX: "none" }} />;
    },

    "section.threeDElement": ({ value }: { value: any }) => {
      return <ThreeDElement data={{ ...value, paddingX: "none" }} />;
    },

    "section.pricingTable": ({ value }: { value: any }) => {
      return <PricingTable data={{ ...value, paddingX: "none" }} />;
    },

    "section.carousel": ({ value }: { value: any }) => {
      return <Carousel data={{ ...value, paddingX: "none" }} />;
    },
  },

  marks: {
    strong: ({ children }: any) => <b>{children}</b>,
    textColor: ({ children, value }: any) => (
      <span style={{ color: stegaClean(value.value) }}>{children}</span>
    ),
    highlightColor: ({ children, value }: any) => (
      <span style={{ background: stegaClean(value.value) }}>{children}</span>
    ),
  },
};
