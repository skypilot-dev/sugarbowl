import type { Integer } from './utils.types.js';

export function round(value: number, decimals: Integer = 0): number {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
}
