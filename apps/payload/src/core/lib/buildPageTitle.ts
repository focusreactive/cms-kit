export function buildPageTitle(
  baseTitle: string,
  separator: string,
  suffix: string,
  siteName: string,
): string {
  if (baseTitle === suffix || baseTitle === siteName) {
    return baseTitle
  }

  return `${baseTitle} ${separator} ${suffix}`
}
