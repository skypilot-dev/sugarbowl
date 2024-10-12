import { describe, expect, it } from 'vitest';

import { getFileSystemRoot } from '~/src/functions/filesystem/getFileSystemRoot.js';
import { toPath } from '~/src/functions/filesystem/toPath.js';
import { unixPathToOsPath } from '~/src/functions/filesystem/unixPathToOsPath.js';

describe('unixPathToOsPath(path: PathLike)', () => {
  it('should convert the path to a path appropriate for the current platform', () => {
    const unixPath = 'var/tmp/file.ext';
    const expected = toPath(['var', 'tmp', 'file.ext']);

    const actual = unixPathToOsPath(unixPath);

    expect(actual).toBe(expected);
  });

  it("should correctly convert a leading '/' to the system root", () => {
    const unixPath = '/var/tmp';
    const expected = toPath([getFileSystemRoot(), 'var', 'tmp']);

    const actual = unixPathToOsPath(unixPath);

    expect(actual).toBe(expected);
  });
});
