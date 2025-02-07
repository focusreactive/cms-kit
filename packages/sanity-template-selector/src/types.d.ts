import type { ArrayFieldProps } from "sanity";
export type Preset = {
    name: string;
    value: {
        _key: string;
        _type: string;
    };
    meta: {
        area: string;
        category: string;
        title: string;
        screenshot: string;
    };
};
export type OnItemAppendType = (item: {
    _key: string;
}) => void;
export interface InputFieldProps extends ArrayFieldProps {
    presets: Preset[];
}
//# sourceMappingURL=types.d.ts.map