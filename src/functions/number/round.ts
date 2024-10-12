export function round(value: number, decimals = 0): number {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
}
