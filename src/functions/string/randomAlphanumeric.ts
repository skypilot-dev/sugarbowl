import { Integer } from '@skypilot/common-types';

export function randomAlphanumeric(length: Integer = 10): string {
  if (length < 0 || length > 10) {
    throw new Error(`Invalid length: ${length}. Length must be from 1 to 10`);
  }
  return Math.random().toString(36).slice(2, length + 2);
}
