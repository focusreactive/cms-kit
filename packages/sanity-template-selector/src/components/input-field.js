"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { AddIcon } from "@sanity/icons";
import { Button, Card, Popover, Stack, Text } from "@sanity/ui";
import { TemplatesBrowser } from "./templates-browser";
function ArrayFunctions(props) {
    const [isOpen, setOpenStatus] = React.useState(false);
    const toggle = () => setOpenStatus((v) => !v);
    return (_jsx(_Fragment, { children: _jsx(Popover, { style: {
                width: "calc(100% - 48px)",
                maxWidth: "700px",
            }, content: _jsx(TemplatesBrowser, { onClose: toggle, onItemAppend: props.inputProps.onItemAppend, presets: props.presets }), padding: 2, placement: "top", portal: true, open: isOpen, children: _jsx("div", { children: _jsx(Button, { style: {
                        width: "100%",
                    }, mode: "ghost", text: "Add Block...", icon: AddIcon, onClick: toggle, disabled: window.location.pathname.startsWith("/presentation/") }) }) }) }));
}
export function InputField(props) {
    return (_jsxs(Stack, { space: 4, children: [_jsx(Card, { children: _jsx(Text, { children: props.title }) }), props.inputProps.renderInput(Object.assign(Object.assign({}, props.inputProps), { 
                // @ts-ignore
                arrayFunctions: () => _jsx(ArrayFunctions, Object.assign({}, props)) }))] }));
}
