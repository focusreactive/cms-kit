import React, { Fragment } from "react";
import type { Page } from "@/generated/payload-types";

import { ContentBlock } from "@/components/blocks/Content/Component";
// import { HeroSection } from "@/components/blocks/Hero/Component";
import { MediaBlock } from "@/components/blocks/MediaBlock/Component";

const blockComponents = {
  content: ContentBlock,
  mediaBlock: MediaBlock,
  // hero: HeroSection,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
