import { Integer } from '@skypilot/common-types';

function generateRandomAlphanumeric(): string {
  const randomString = Math.random().toString(36);
  return randomString.slice(2, randomString.length);
}

export function randomAlphanumeric(length: Integer = 8): string {
  if (length < 0) {
    throw new Error(`Expected 'length' >= 0; got ${length}`)
  }
  let randomString = '';
  while (randomString.length < length) {
    randomString += generateRandomAlphanumeric();
  }
  return randomString.slice(0, length);
}
