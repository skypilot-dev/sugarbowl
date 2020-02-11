import * as path from 'path';
import { findPackageFileDir } from '../findPackageFileDir';

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
