export function buildInternalPathname(
  pathname: string,
  matchedLocale: string | undefined,
  defaultLocale: string,
) {
  return matchedLocale ? pathname : `/${defaultLocale}${pathname === '/' ? '' : pathname}`
}
