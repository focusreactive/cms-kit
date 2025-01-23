import React from "react";
import { CloseCircleIcon } from "@sanity/icons";
import { Button, Flex } from "@sanity/ui";

import type { OnItemAppendType, Preset } from "../types";
import { Template } from "./template";

export function TemplatesBrowser({ onClose, onItemAppend, presets }: Props) {
  return (
    <Flex justify="flex-end" gap={2}>
      <Button padding={1} mode="bleed" onClick={onClose}>
        <CloseCircleIcon
          style={{
            width: 24,
            height: 24,
          }}
        />
      </Button>
      <Flex gap={2}>
        {presets.map((preset) => (
          <Template
            key={preset.name}
            preset={preset}
            onItemAppend={onItemAppend}
          />
        ))}
      </Flex>
    </Flex>
  );
}

type Props = {
  onClose: () => void;
  onItemAppend: OnItemAppendType;
  presets: Preset[];
};
