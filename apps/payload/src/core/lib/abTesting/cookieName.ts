export function manifestKeyToExpId(manifestKey: string): string {
  return decodeURIComponent(manifestKey).replace(/^\/+/, '').replace(/\/+$/, '').replace(/\//g, '_')
}

export function manifestKeyToExpCookieName(manifestKey: string): string {
  return `exp_${manifestKeyToExpId(manifestKey)}`
}
