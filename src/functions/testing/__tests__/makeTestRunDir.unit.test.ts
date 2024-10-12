import { afterEach, describe, expect, it } from 'vitest';

import type { Directory } from '~/src/classes/Directory.js';
import { makeTempDir } from '~/src/functions/filesystem/makeTempDir.js';
import { makeTestRunDir } from '~/src/functions/testing/makeTestRunDir.js';

const runDirPattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{6}_[A-Za-z0-9]+/;
const testSuiteName = 'makeTestRunDir.unit';

let testRunDir: Directory | null = null;

describe('makeTestRunDir()', () => {
  afterEach(() => {
    if (testRunDir) {
      console.info('testRunDir.fullPath:', testRunDir.fullPath);
    }
    testRunDir = null;
    // testRunDir.safeWipeSync({ remove: true });
  });

  it('should create a test directory with a timestamp and random suffix', () => {
    testRunDir = makeTestRunDir(testSuiteName);

    expect(testRunDir.baseName).toMatch(runDirPattern);
  });

  it('if testSuiteName is an absolute path, should throw', () => {
    const testSuiteName = '/makeTestRunDir';

    expect(() => {
      makeTestRunDir(testSuiteName);
    }).toThrow('Test suite name ');
  });

  it('should create the directory in testsDirPath if given', () => {
    const testsDirPath = makeTempDir('makeTestRunDir.unit-2');
    testRunDir = makeTestRunDir(testSuiteName, testsDirPath);

    expect(testRunDir.dirPathRoot).toBe(testsDirPath);
    expect(testRunDir.baseName).toMatch(runDirPattern);
  });
});
