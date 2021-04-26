import path from 'path';

import { listFilesSync } from '../listFilesSync';

const dirPath = path.relative(path.resolve(), __dirname);

describe('listFilesSync(dirPath: string)', () => {
  it('should list all files in the directory, resolved relative to the project root', () => {
    const expectedFilePaths = [
      'src/functions/filesystem/__tests__/listFilesSync.unit.test.md',
      'src/functions/filesystem/__tests__/listFilesSync.unit.test.ts',
    ];

    const filePaths = listFilesSync(dirPath);

    expect(filePaths).toEqual(expect.arrayContaining(expectedFilePaths));
  });

  it("if a fileNamePattern is included, should exclude files that don't match the pattern", () => {
    const expectedFilePaths = ['src/functions/filesystem/__tests__/listFilesSync.unit.test.ts'];
    const unexpectedFilePaths = ['src/functions/filesystem/__tests__/listFilesSync.unit.test.md'];

    const filePaths = listFilesSync(dirPath, { fileNamePattern: /^listFilesSync.*\.ts$/ });

    expect(filePaths).toEqual(expect.arrayContaining(expectedFilePaths));
    expect(filePaths).not.toEqual(expect.arrayContaining(unexpectedFilePaths));
  });

  it("if pathFormat is set to 'relative', should not include the dirPath in the returned paths", () => {
    const expectedFilePaths = [
      'listFilesSync.unit.test.md',
      'listFilesSync.unit.test.ts',
    ];

    const filePaths = listFilesSync(dirPath, { pathFormat: 'relative' });

    expect(filePaths).toEqual(expect.arrayContaining(expectedFilePaths));
  });

  it('if fileNamePattern is a string, should convert it into a RegExp', () => {
    const fileNamePattern = '[j-m]istFilesSync.unit.test.[m|t]*'; // an arbitrary pattern to demonstrate conversion
    const expectedFilePaths = [
      'listFilesSync.unit.test.md',
      'listFilesSync.unit.test.ts',
    ];

    const filePaths = listFilesSync(dirPath, { fileNamePattern, pathFormat: 'relative' });

    expect(filePaths).toEqual(expect.arrayContaining(expectedFilePaths));
  });
});
