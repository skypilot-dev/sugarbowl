import type { Integer } from '@skypilot/common-types';

export function generateRandomInt(minValue: number, maxValue: number): Integer {
  if (minValue > maxValue) {
    throw new Error(`Invalid range: minValue (${minValue}) cannot be greater than maxValue (${maxValue})`);
  }
  return Math.floor(
    Math.random() * (
      Math.floor(maxValue) - Math.floor(minValue) + 1
    ),
  ) + Math.floor(minValue);
}
