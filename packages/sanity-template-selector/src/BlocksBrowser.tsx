import React from "react";
import { CloseCircleIcon, SearchIcon } from "@sanity/icons";
import { Autocomplete, Box, Select, Stack } from "@sanity/ui";
import styled from "styled-components";

import {
  OnItemAppend,
  Preset,
  RenderItemProps,
  RenderItemViewProps,
  RenderViewProps,
} from "./types";

const DefaultRenderItemView = ({ preset }: RenderItemViewProps) => {
  return (
    <div
      style={{
        padding: 5,
      }}
    >
      <h4 style={{ marginBottom: 5 }}>{preset.meta?.title}</h4>
      <img
        style={{
          width: "100%",
          height: "auto",
          borderRadius: 5,
        }}
        src={preset.meta.screenshot}
        alt={preset.meta?.title}
      />
    </div>
  );
};

const ItemContainer = styled.div`
  font-size: 10px;
  overflow: hidden;
  background-color: #24242459;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0.9;

  &:hover {
    cursor: zoom-in;
    opacity: 1;
    background-color: #2424248c;
  }
`;

const ItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 6px;

  button.primary {
    flex: none;
    min-width: 50px;
    padding: 4px 12px;
    background-color: #1a345a;
    color: white;
    align-self: flex-end;
    border-radius: 5px;
    &:hover {
      background-color: #203e6c;
    }
  }
`;

const DefaultRenderItem = ({
  preset,
  onItemAppend,
  selectSinglePreset,
}: RenderItemProps) => {
  const handleClick = () => {
    onItemAppend(preset.value);
  };

  const handleSelectSingle = () => {
    selectSinglePreset(preset);
  };

  return (
    <ItemContainer>
      <div className="preview" onClick={handleSelectSingle}>
        <DefaultRenderItemView preset={preset} />
      </div>
      <ItemActions>
        <button className="primary" onClick={handleClick}>
          Add
        </button>
      </ItemActions>
    </ItemContainer>
  );
};

const ViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  gap: 16px;
  padding: 8px;
  border-radius: 8px;
  background-color: #9f9f9f4a;
`;

const PopupInnerContainer = styled.div`
  max-height: 40vh;
  overflow-y: auto;
`;

const ViewColumnContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-base: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  width: 50px;
`;

const RenderColumn = ({
  presets,
  position,
  columns,
  onItemAppend,
  selectSinglePreset,
}: RenderViewProps & { position: number; columns: number }) => {
  const presetsColumns = presets.filter((_, i) => i % columns === position);
  return (
    <ViewColumnContainer>
      {presetsColumns.map((preset) => (
        <div key={preset.value._key}>
          <DefaultRenderItem
            preset={preset}
            onItemAppend={onItemAppend}
            selectSinglePreset={selectSinglePreset}
          />
        </div>
      ))}
    </ViewColumnContainer>
  );
};

const DefaultRenderView = ({
  presets,
  onItemAppend,
  selectSinglePreset,
}: RenderViewProps) => {
  const columns = 3;
  const rendersArray = new Array(columns).fill(1).map((_, i) => i);

  return (
    <div>
      <PopupInnerContainer>
        <ViewContainer>
          {rendersArray.map((c) => (
            <RenderColumn
              key={c}
              presets={presets}
              onItemAppend={onItemAppend}
              position={c}
              columns={columns}
              selectSinglePreset={selectSinglePreset}
            />
          ))}
        </ViewContainer>
      </PopupInnerContainer>
    </div>
  );
};

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 20px;
  color: #595959;
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;

  &:hover {
    color: #b6b6b6;
  }
`;

type Props = {
  onClose: () => void;
  onItemAppend: OnItemAppend;
  presets: Preset[];
};

const BlocksBrowser = ({ onClose, onItemAppend, presets }: Props) => {
  const [singleViewName, setSingleViewName] = React.useState<string>("");

  const preset = singleViewName
    ? presets.find((p) => p.name === singleViewName)
    : undefined;

  const selectSinglePreset = (p?: Preset) => {
    if (!p) {
      setSingleViewName("");
    }
    setSingleViewName(p!.name);
  };

  const resetSinglePreset = () => setSingleViewName("");

  return (
    <Box>
      <CloseButton onClick={onClose}>
        <CloseCircleIcon />
      </CloseButton>
      <Stack>
        {singleViewName ? (
          <Box>
            <DefaultRenderItem
              onItemAppend={onItemAppend}
              preset={preset!}
              selectSinglePreset={resetSinglePreset}
            />
          </Box>
        ) : (
          <Box>
            <DefaultRenderView
              presets={presets}
              onItemAppend={onItemAppend}
              selectSinglePreset={selectSinglePreset}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default BlocksBrowser;
