import { Integer } from '@skypilot/common-types';

export function randomAlphanumeric(length: Integer = 8): string {
  if (length < 0 || length > 8) {
    throw new Error(`Invalid length: ${length}. Length must be from 0 to 8`);
  }
  return Math.random().toString(36).slice(2, length + 2);
}
