import type { NumberString } from '@skypilot/common-types';

export function isNumeric(x: unknown): x is number | NumberString {
  if (typeof x === 'number') {
    return !isNaN(x);
  }

  if (typeof x !== 'string') {
    return false;
  }
  if (/^0x[0-9a-f]+$/i.test(x)) {
    return true;
  }
  return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
}
