import path from 'path';
import { version as expectedVersion } from '../../../../package.json';
import { readPackageFile } from '../readPackageFile';

/* The path is resolved relative to the project root. */
const pathToFile = path.resolve('package.json');

describe('readPackageFile()', () => {
  it("should return the current project's `package.json` as an object literal", () => {
    /* Test by reading a value from `package.json` and a value from the object returned by
     * `readPackageFile()`. */
    const { version } = readPackageFile();
    expect(version).toBe(expectedVersion);
  });

  it('can accept the filepath as a string', () => {
    const { version } = readPackageFile(pathToFile);
    expect(version).toBe(expectedVersion);
  });

  it('can accept the filepath as an object property', () => {
    const { version } = readPackageFile({ pathToFile });
    expect(version).toBe(expectedVersion);
  });

  it('can accept an empty object', () => {
    const { version } = readPackageFile({});
    expect(version).toBe(expectedVersion);
  });
});
