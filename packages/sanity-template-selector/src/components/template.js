import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Stack, Text } from "@sanity/ui";
import { addKeysToNodes } from "../utils";
export function Template({ preset, onItemAppend }) {
    var _a, _b;
    const handleAppendClick = () => {
        const processedValue = addKeysToNodes(preset.value);
        onItemAppend(processedValue);
    };
    return (_jsx(Card, { style: {
            border: "1px solid #E0E0E0",
            borderRadius: "4px",
            padding: "8px",
            cursor: "copy",
        }, children: _jsxs(Stack, { space: 2, onClick: handleAppendClick, children: [_jsx(Text, { style: {
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: 500,
                        marginBottom: "8px",
                    }, children: (_a = preset.meta) === null || _a === void 0 ? void 0 : _a.title }), _jsx("img", { style: {
                        width: "100%",
                        height: "auto",
                        borderRadius: 4,
                    }, src: preset.meta.screenshot, alt: (_b = preset.meta) === null || _b === void 0 ? void 0 : _b.title })] }) }));
}
