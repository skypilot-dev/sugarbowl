import path from 'node:path';

import { makeTestsDir } from './makeTestsDir.js';

import { Directory } from '~/src/classes/Directory.js';
import { makeTempDir } from '~/src/functions/filesystem/makeTempDir.js';
import type { PathLike } from '~/src/functions/filesystem/toPath.js';
import { toPath } from '~/src/functions/filesystem/toPath.js';

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
