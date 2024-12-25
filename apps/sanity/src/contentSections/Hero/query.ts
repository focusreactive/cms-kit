import { LINK_FRAGMENT } from "@/lib/api/fragments";

export const HERO_FRAGMENT = `
  ...,
  globalData->{
  ...,
    links[] {
      ${LINK_FRAGMENT}
    },
  },
  links[] {
    ${LINK_FRAGMENT}
  }
`;
