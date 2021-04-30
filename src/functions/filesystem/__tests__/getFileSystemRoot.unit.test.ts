import path from 'path';
import { getFileSystemRoot } from '../getFileSystemRoot';
import { unixPathToOsPath } from '../unixPathToOsPath';

// TODO: Test under Windows

describe('getFileSystemRoot()', () => {
  it("should return the root directory of the project's drive volume", () => {
    const expected = path.parse(path.resolve()).root;
    const actual = getFileSystemRoot();
    expect(actual).toBe(expected);
  });

  it("given a path, should return the root directory of the path's drive volume", () => {
    const filePath = '/var/tmp';
    const expected = unixPathToOsPath('/');

    const actual = getFileSystemRoot(filePath);
    expect(actual).toBe(expected);
  });
});
