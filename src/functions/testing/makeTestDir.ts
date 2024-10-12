import { Directory } from 'src/classes/Directory.js';
import type { DirectoryLike } from 'src/classes/index.js';
import { defaultSafeWipeBoundaries } from 'src/functions/filesystem/_constants.js';
import { checkIsInBoundary, makeBoundaryErrorMessage } from 'src/functions/filesystem/checkIsInBoundary.js';
import type { PathLike } from 'src/functions/filesystem/toPath.js';

interface MakeTestDirOptions {
  dryRun?: string;
  verbose?: boolean;
}

// Create a test dir
export function makeTestDir(
  testName: PathLike,
  testRunDir: DirectoryLike,
  options: MakeTestDirOptions = {},
): Directory {
  const { dryRun = false, verbose = false } = options;

  const fullPath = Directory.resolve(testRunDir);
  if (!checkIsInBoundary(fullPath, defaultSafeWipeBoundaries)) {
    throw new Error(makeBoundaryErrorMessage(fullPath, 'create test directory', defaultSafeWipeBoundaries));
  }

  const testDir = dryRun
    ? new Directory(testName, { baseDir: testRunDir })
    : new Directory(testName, { baseDir: testRunDir }).makeSync();

  if (verbose) {
    console.info(`Temporary directory ${dryRun ? 'name generated' : 'created'}: ${fullPath}`);
  }

  return testDir;
}
