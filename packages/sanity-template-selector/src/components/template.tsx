import React from "react";
import { Card, Stack, Text } from "@sanity/ui";

import type { OnItemAppendType, Preset } from "../types";
import { addKeysToNodes } from "../utils";

export function Template({ preset, onItemAppend }: TemplateProps) {
  const handleAppendClick = () => {
    const processedValue = addKeysToNodes(preset.value);

    onItemAppend(processedValue);
  };

  return (
    <Card
      style={{
        border: "1px solid #E0E0E0",
        borderRadius: "4px",
        padding: "8px",
        cursor: "copy",
      }}
    >
      <Stack space={2} onClick={handleAppendClick}>
        <Text
          style={{
            textAlign: "center",
            fontSize: "16px",
            fontWeight: 500,
            marginBottom: "8px",
          }}
        >
          {preset.meta?.title}
        </Text>
        <img
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 4,
          }}
          src={preset.meta.screenshot}
          alt={preset.meta?.title}
        />
      </Stack>
    </Card>
  );
}

type TemplateProps = {
  preset: Preset;
  onItemAppend: OnItemAppendType;
};
