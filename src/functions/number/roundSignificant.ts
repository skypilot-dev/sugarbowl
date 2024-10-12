import { round } from './round.js';

export function roundSignificant(value: number, significantDigits = 2): number {
  if (value === 0) {
    return 0;
  }
  const magnitude = Math.floor(Math.log10(Math.abs(value)));
  const decimals = significantDigits - magnitude - 1;
  return round(value, decimals);
}
