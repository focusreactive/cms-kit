import type { SectionThreeDElement } from "@/generated/extracted-types";

export interface IThreeDElementProps {
  data: SectionThreeDElement & {
    _key: string;
  };
}
