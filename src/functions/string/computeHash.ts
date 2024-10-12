import crypto from 'node:crypto';

import type { Integer } from '@skypilot/common-types';

export function computeHash(stringToHash: string, length: Integer = 32): string {
  if (length > 32) {
    throw new Error('Invalid hash length requested: The maximum length is 32.');
  }
  const hash = crypto
    .createHash('md5')
    .update(stringToHash)
    .digest('hex');
  return hash.slice(0, length);
}
