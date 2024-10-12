import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { findPackageFileDir } from '~/src/functions/filesystem/findPackageFileDir.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('findPackageFileDir()', () => {
  it("should return the path of the directory that contains this project's package file", () => {
    const packageFileDir = findPackageFileDir();

    const expectedDir = path.resolve(__dirname, '../../../..');
    expect(packageFileDir).toBe(expectedDir);
  });

  it("should return the path of the directory that contains this project's package file", () => {
    const packageFileDir = findPackageFileDir('nonexistent-file');

    const expectedDir = '';
    expect(packageFileDir).toBe(expectedDir);
  });
});
