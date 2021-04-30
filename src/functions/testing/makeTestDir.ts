import { Directory } from 'src/classes';
import type { DirectoryLike } from 'src/classes';
import { checkIsInBoundary } from 'src/functions';
import type { PathLike } from 'src/functions';
import { defaultSafeWipeBoundaries } from 'src/functions/filesystem/_constants';
import { makeBoundaryErrorMessage } from 'src/functions/filesystem/checkIsInBoundary';

interface MakeTestDirOptions {
  dryRun?: string;
  verbose?: boolean;
}

// Create a test dir
export function makeTestDir(
  testName: PathLike, testRunDir: DirectoryLike, options: MakeTestDirOptions = {}
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
    // eslint-disable-next-line no-console
    console.info(`Temporary directory ${dryRun ? 'name generated' : 'created'}: ${fullPath}`);
  }

  return testDir;
}
