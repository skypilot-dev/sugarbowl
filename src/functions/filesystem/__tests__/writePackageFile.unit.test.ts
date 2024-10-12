import { makeTestDir, makeTestRunDir } from 'src/functions/index.js';
import { describe, expect, it } from 'vitest';

import { readPackageFileSync } from '~/src/functions/filesystem/readPackageFileSync.js';
import { writePackageFileSync } from '~/src/functions/filesystem/writePackageFileSync.js';

const testRunDir = makeTestRunDir('writePackageFileSync.unit');

describe('writePackageFileSync()', () => {
  it('should write the object to a JSON file', () => {
    const testDir = makeTestDir('basic', testRunDir);
    const filePath = testDir.join('package-file.json');
    const content = { version: '9.9.9' };
    const params = {
      content,
      filePath,
    };
    const expected = {
      fullPath: filePath,
      overwritten: false,
      status: 'OK',
    };

    const actual = writePackageFileSync(params);
    expect(actual).toStrictEqual(expected);

    const readData = readPackageFileSync({ filePath });
    expect(readData).toEqual(content);
    expect(readData).not.toBe(content);
  });
});
