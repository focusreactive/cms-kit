import { jsx as _jsx } from "react/jsx-runtime";
import { InputField } from "./components/input-field";
export const getTemplatesSelectorComponents = (params) => ({
    field: (props) => _jsx(InputField, Object.assign({}, props, params)),
});
