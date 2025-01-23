import React from "react";
import { CloseCircleIcon } from "@sanity/icons";
import { Button, Flex, Grid } from "@sanity/ui";

import type { OnItemAppendType, Preset } from "../types";
import { Template } from "./template";

export function TemplatesBrowser({ onClose, onItemAppend, presets }: Props) {
  return (
    <Flex justify="flex-end" direction="column" gap={2}>
      <Flex justify="flex-end">
        <Button
          padding={1}
          mode="bleed"
          onClick={onClose}
          icon={CloseCircleIcon}
        />
      </Flex>
      <Grid gap={4} columns={2}>
        {presets.map((preset) => (
          <Template
            key={preset.name}
            preset={preset}
            onItemAppend={onItemAppend}
          />
        ))}
      </Grid>
    </Flex>
  );
}

type Props = {
  onClose: () => void;
  onItemAppend: OnItemAppendType;
  presets: Preset[];
};
