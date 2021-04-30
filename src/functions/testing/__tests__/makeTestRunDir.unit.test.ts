import type { Directory } from 'src/classes';
import { makeTempDir } from 'src/functions';
import { makeTestRunDir } from '../makeTestRunDir';

const runDirPattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{6}_[A-Za-z0-9]+/;
const testSuiteName = 'makeTestRunDir.unit';

let testRunDir: Directory | null = null;

afterEach(() => {
  if (testRunDir) {
    console.log('testRunDir.fullPath:', testRunDir.fullPath);
  }
  testRunDir = null;
  // testRunDir.safeWipeSync({ remove: true });
});

describe('makeTestRunDir()', () => {
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
