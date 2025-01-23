import React from "react";
import { AddIcon } from "@sanity/icons";
import { Button, Card, Stack, Text } from "@sanity/ui";

import type { OnItemAppendType, Preset } from "../types";

export function Template({ preset, onItemAppend }: TemplateProps) {
  const handleAppendClick = () => {
    onItemAppend(preset.value);
  };

  return (
    <Card>
      <Stack space={2}>
        <Text>{preset.meta?.title}</Text>
        <img
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 5,
          }}
          src={preset.meta.screenshot}
          alt={preset.meta?.title}
        />
        <Button mode="ghost" icon={AddIcon} onClick={handleAppendClick} />
      </Stack>
    </Card>
  );
}

type TemplateProps = {
  preset: Preset;
  onItemAppend: OnItemAppendType;
};
