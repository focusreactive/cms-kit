import React, { type ComponentType, type ReactElement } from "react";
import { AddIcon } from "@sanity/icons";
import { Button, Card, Grid, Popover, Stack, Text } from "@sanity/ui";
import type { ArrayFieldProps } from "sanity";
import styled from "styled-components";

import BlocksBrowser from "./BlocksBrowser";
import type { BlocksInputCustomProps } from "./types";

const ButtonsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: stretch;
  gap: 16px;
  width: 100%;
  button {
    flex-grow: 1;
  }
`;

type RenderBlocksSelectorProps = {
  onClose: () => void;
};
type ArrayFunctionsProps = {
  onPaste: () => void;
  renderBlocksSelector: (props: RenderBlocksSelectorProps) => React.ReactNode;
};

const ArrayFunctions = ({
  renderBlocksSelector,
  onPaste,
}: ArrayFunctionsProps) => {
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const handleClose = () => {
    setIsAddOpen(!isAddOpen);
  };
  return (
    <Grid>
      <Popover
        style={{ width: "calc(100% - 48px)" }}
        content={renderBlocksSelector({ onClose: handleClose })}
        padding={4}
        placement="top"
        portal
        open={isAddOpen}
      >
        <ButtonsContainer>
          <Button
            mode="ghost"
            selected={false}
            text="Add Block..."
            icon={AddIcon}
            onClick={handleClose}
            disabled={window.location.pathname.startsWith("/presentation/")}
          />
          <Button
            mode="ghost"
            selected={false}
            text="Paste Block..."
            icon={AddIcon}
            onClick={onPaste}
          />
        </ButtonsContainer>
      </Popover>
    </Grid>
  );
};

export const BlocksInput: ComponentType<
  ArrayFieldProps & BlocksInputCustomProps
> = (props: ArrayFieldProps & BlocksInputCustomProps) => {
  const inputProps: ArrayFieldProps["inputProps"] = {
    ...props.inputProps,
    arrayFunctions: () => (
      <ArrayFunctions
        renderBlocksSelector={({ onClose }) => {
          return (
            <BlocksBrowser
              onClose={onClose}
              onItemAppend={props.inputProps.onItemAppend}
              presets={props.presets}
            />
          );
        }}
        onPaste={() => console.log("migrating")}
      />
    ),
  };

  return (
    <Stack space={[3, 3, 4, 5]}>
      <Card>
        <Text>{props.title}</Text>
        <Text>{props.description}</Text>
      </Card>
      {props.inputProps.renderInput(inputProps)}
    </Stack>
  );
};

export const templateSelectorInput = (
  params: object,
): { field: (props: any) => ReactElement } => {
  return {
    field: (props) => <BlocksInput {...props} {...params} />,
  };
};
