export function getLastModifiedDate(...dates: (string | Date | null | undefined)[]): Date | null {
  const validDates = dates
    .filter((date): date is string | Date => !!date)
    .map((date) => (date instanceof Date ? date : new Date(date)))
    .filter((date) => !isNaN(date.getTime()))

  if (validDates.length === 0) {
    return null
  }

  return new Date(Math.max(...validDates.map((d) => d.getTime())))
}
