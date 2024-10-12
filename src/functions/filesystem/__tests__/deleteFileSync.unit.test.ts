import fs from 'node:fs';

import { makeTestDir, makeTestRunDir } from 'src/functions/index.js';
import { describe, expect, it } from 'vitest';

import { deleteFileSync } from '~/src/functions/filesystem/deleteFileSync.js';

const testRunDir = makeTestRunDir('deleteFileSync.unit');

describe('deleteFileSync()', () => {
  it("if the file exists, should delete it and return the full path and 'OK' in the result", () => {
    const testDir = makeTestDir('basic', testRunDir);
    const fullPath = testDir.join('file-to-delete.txt');
    fs.writeFileSync(fullPath, 'sample content');
    const expected = {
      fullPath,
      status: 'OK',
    };

    const actual = deleteFileSync(fullPath);

    expect(actual).toStrictEqual(expected);
  });

  it("if the file does not exist, should return the full path and 'file not found' in the result", () => {
    const fullPath = testRunDir.join('nonexistent-file');
    const expected = {
      fullPath,
      status: 'file not found',
    };

    const actual = deleteFileSync(fullPath);

    expect(actual).toStrictEqual(expected);
  });
});
