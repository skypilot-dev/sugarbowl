import type { Integer } from '@skypilot/common-types';

export function objectLength(obj: Record<string, unknown>): Integer {
  return Object.keys(obj).length;
}
