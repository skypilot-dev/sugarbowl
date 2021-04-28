import { Directory } from 'src/classes';
import type { DirectoryLike } from 'src/classes';
import { makeTempDir } from 'src/functions';

// Return a handle to a directory created for a single run of a test suite
export function makeTestRunDir(testsDir: DirectoryLike, testSuiteName: string): Directory {
  const testRunDir = makeTempDir('', {
    baseDir: [Directory.toPath(testsDir), testSuiteName],
    dateTimeFormat: { preset: 'slug', dateTimeResolution: 'second' },
    addRandomSuffix: true,
  });

  return new Directory(testRunDir, { baseDir: testsDir });
}
