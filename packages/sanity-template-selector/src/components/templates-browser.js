import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CloseCircleIcon } from "@sanity/icons";
import { Button, Flex, Grid } from "@sanity/ui";
import { Template } from "./template";
export function TemplatesBrowser({ onClose, onItemAppend, presets }) {
    return (_jsxs(Flex, { justify: "flex-end", direction: "column", gap: 2, children: [_jsx(Flex, { justify: "flex-end", children: _jsx(Button, { padding: 1, mode: "bleed", onClick: onClose, icon: CloseCircleIcon }) }), _jsx(Grid, { gap: 4, columns: 2, children: presets.map((preset) => (_jsx(Template, { preset: preset, onItemAppend: onItemAppend }, preset.name))) })] }));
}
