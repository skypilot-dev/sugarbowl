import path from 'path';
import { Directory } from 'src/classes';
import { makeTempDir, toPath } from 'src/functions';
import type { PathLike } from 'src/functions';
import { makeTestsDir } from './makeTestsDir';

// Return a handle to a directory created for a single run of a test suite
export function makeTestRunDir(testSuiteName: PathLike, testsDirPath?: PathLike): Directory {
  const testSuitePath = toPath(testSuiteName);

  // TODO: Add other validations
  if (testSuitePath.startsWith(path.sep)) {
    throw new Error(`Test suite name cannot start with '${path.sep}'`);
  }

  const testsDir = makeTestsDir(toPath(testsDirPath || ''));

  const testRunDir = makeTempDir('', {
    baseDir: [testsDir.fullPath, testSuitePath],
    dateTimeFormat: { preset: 'slug', dateTimeResolution: 'second' },
    addRandomSuffix: true,
  });

  return new Directory(testRunDir, { baseDir: testsDirPath });
}
