import { getFileSystemRoot } from '../getFileSystemRoot';
import { toPath } from '../toPath';
import { unixPathToOsPath } from '../unixPathToOsPath';

describe('unixPathToOsPath(path: PathLike)', () => {
  it('should convert the path to a path appropriate for the current platform', () => {
    const unixPath = '/var/tmp';
    const expected = toPath([getFileSystemRoot(), 'var', 'tmp']);

    const actual = unixPathToOsPath(unixPath);

    expect(actual).toBe(expected);
  });
});
