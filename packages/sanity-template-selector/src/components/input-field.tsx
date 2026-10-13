"use client";

import React from "react";
import { AddIcon } from "@sanity/icons";
import { Button, Card, Popover, Stack, Text } from "@sanity/ui";

import type { InputFieldProps } from "../types";
import { TemplatesBrowser } from "./templates-browser";

function ArrayFunctions(props: InputFieldProps) {
  const [isOpen, setOpenStatus] = React.useState(false);

  const toggle = () => setOpenStatus((v) => !v);

  return (
    <>
      <Popover
        style={{
          width: "calc(100% - 48px)",
          maxWidth: "700px",
        }}
        content={
          <TemplatesBrowser
            onClose={toggle}
            onItemAppend={props.inputProps.onItemAppend}
            presets={props.presets}
          />
        }
        padding={2}
        placement="top"
        // The browser is a two-column grid that grows with the number of
        // registered presets, so past a handful it runs off the bottom of the
        // viewport and the last rows cannot be reached. `constrainSize` caps it
        // to the available space (flipping or resizing as needed) and
        // `overflow` makes what no longer fits scrollable.
        constrainSize
        overflow="auto"
        portal
        open={isOpen}
      >
        <div>
          <Button
            style={{
              width: "100%",
            }}
            mode="ghost"
            text="Add Block..."
            icon={AddIcon}
            onClick={toggle}
            disabled={window.location.pathname.startsWith("/presentation/")}
          />
        </div>
      </Popover>
    </>
  );
}

export function InputField(props: InputFieldProps) {
  return (
    <Stack space={4}>
      <Card>
        <Text>{props.title}</Text>
      </Card>
      {props.inputProps.renderInput({
        ...props.inputProps,
        // @ts-ignore
        arrayFunctions: () => <ArrayFunctions {...props} />,
      })}
    </Stack>
  );
}
