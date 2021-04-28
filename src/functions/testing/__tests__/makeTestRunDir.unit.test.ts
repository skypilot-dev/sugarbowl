import { makeTestRunDir } from '../makeTestRunDir';
import { makeTestsDir } from '../makeTestsDir';

const testsDir = makeTestsDir();

describe('makeTestRunDir()', () => {
  it('should create a test directory with a timestamp and random suffix', () => {
    const testRunDir = makeTestRunDir(testsDir, 'makeTestRunDir.unit');
    const expectedPattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{6}_[A-Za-z0-9]+/;

    expect(testRunDir.baseName).toMatch(expectedPattern);
  });
});
