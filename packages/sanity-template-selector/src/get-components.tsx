import React from "react";
import type { ArrayFieldProps } from "sanity";

import { InputField } from "./components/input-field";
import type { PresetProps } from "./types";

export const getTemplatesSelectorComponents = (params: PresetProps) => ({
  field: (props: ArrayFieldProps) => <InputField {...props} {...params} />,
});
