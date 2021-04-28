import fs from 'fs';
import path from 'path';

import { Directory } from 'src/classes';
import { makeTestRunDir, makeTestsDir } from 'src/functions';
import { wipeDir } from '../wipeDir';

const testRunDir = makeTestRunDir(makeTestsDir(), 'wipeDir.unit');
const testDir = new Directory('wipeDir', { baseDir: testRunDir });

beforeAll(() => {
  testDir.makeSync();
});

afterAll(() => {
  testDir.removeSync();
});

describe('wipeDir', () => {
  it('should delete all files and directories in the directory but not the directory itself', async () => {
    /* Create a subdir */
    const subDirPath = path.join(testDir.fullPath, 'subdir');
    const filePath = path.join(subDirPath, 'test.file.txt');
    fs.mkdirSync(subDirPath, { recursive: true });

    /* Write some data to a file */
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(
        filePath, 'test data for src/functions/filesystem/__tests__/wipeDir.unit.test.ts'
      );
    }

    /* Check that the file exists */
    expect(fs.existsSync(filePath)).toBe(true);

    /* Wipe the directory */
    await wipeDir(testDir.fullPath, { recursive: true });

    expect(fs.existsSync(filePath)).toBe(false);
    expect(fs.existsSync(subDirPath)).toBe(false);
  });
});
