import React from "react";
import type { ArrayFieldProps } from "sanity";

import { InputField } from "./components/input-field";
import type { InputFieldProps } from "./types";

export const getTemplatesSelectorComponents = (params: InputFieldProps) => ({
  field: (props: ArrayFieldProps) => <InputField {...props} {...params} />,
});
