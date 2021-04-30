import fs from 'fs';

import { Directory } from 'src/classes';
import type { DirectoryLike } from 'src/classes';
import { checkIsInBoundary } from 'src/functions';
import type { PathLike } from 'src/functions';
import { defaultSafeWipeBoundaries } from '../../_constants';
import { makeBoundaryErrorMessage } from '../../checkIsInBoundary';

/* Create a  directory and subdirectory for use in tests of `Directory`, `safeWipe` & `safeWipeSync` */
export function makeDirForSafeWipe(testName: PathLike, testRunDir: DirectoryLike): {
  baseDir: Directory; baseFilePath: string; subDir: Directory; subFilePath: string;
} {
  const resolvedPath = Directory.resolve(testRunDir);
  if (!checkIsInBoundary(resolvedPath, defaultSafeWipeBoundaries)) {
    throw new Error(makeBoundaryErrorMessage(resolvedPath, 'create test files', defaultSafeWipeBoundaries));
  }

  const baseDir = new Directory(testName, { baseDir: testRunDir }).makeSync();
  const subDir = new Directory('subdir', { baseDir }).makeSync();
  const baseFileName = 'dir.txt';
  const subFileName = 'subdir.txt';
  const baseFilePath = baseDir.join(baseFileName);
  const subFilePath = subDir.join(subFileName);

  fs.writeFileSync(baseFilePath, 'sample content');
  fs.writeFileSync(subFilePath, 'sample content');

  if (!fs.existsSync(baseFilePath) && !fs.existsSync(subFilePath)) {
    throw new Error('Files were not created for the test');
  }
  return { baseDir, baseFilePath, subDir, subFilePath };
}
