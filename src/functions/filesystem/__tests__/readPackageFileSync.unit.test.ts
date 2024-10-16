import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { version as expectedVersion } from '~/package.json';
import { readPackageFileSync } from '~/src/functions/filesystem/readPackageFileSync.js';

/* The path is resolved relative to the project root. */
const filePath = path.resolve('package.json');

describe('readPackageFileSync()', () => {
  it("should return the current project's `package.json` as an object literal", () => {
    /* Test by reading a value from `package.json` and a value from the object returned by
     * `readPackageFileSync()`. */
    const { version } = readPackageFileSync();
    expect(version).toBe(expectedVersion);
  });

  it('can accept the filepath as a string', () => {
    const { version } = readPackageFileSync(filePath);
    expect(version).toBe(expectedVersion);
  });

  it('can accept the filepath as an object property', () => {
    const { version } = readPackageFileSync({ filePath });
    expect(version).toBe(expectedVersion);
  });

  it('can accept an empty object', () => {
    const { version } = readPackageFileSync({});
    expect(version).toBe(expectedVersion);
  });
});
