import { version } from '../../../../package.json';
import { readPackageFile } from '../readPackageFile';


describe('readPackageFile()', () => {
  it("should return the current project's `package.json` as a JSON object", () => {
    /* Test by reading a value from `package.json` and a value from the object returned by
     * `readPackageFile()`. */
    const expectedVersion = version;
    const actualVersion = readPackageFile().version;
    expect(actualVersion).toBe(expectedVersion);
  });
});
