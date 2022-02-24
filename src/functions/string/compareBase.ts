// Return a function that compares the base of the strings and returns a number indicating their relative ranking
export function compareBase(localeCode = 'en'): (a: string, b: string) => number {
  return (a: string, b: string): number => a.localeCompare(b, localeCode, { sensitivity: 'base' });
}
