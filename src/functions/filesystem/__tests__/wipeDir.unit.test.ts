import fs from 'fs';
import os from 'os';
import path from 'path';
import { wipeDir } from '../wipeDir';

const testDirPath = path.join(os.tmpdir(), 'wipeDir-unit-test');

describe('', () => {
  beforeAll(() => {
    fs.mkdirSync(testDirPath, { recursive: true });
  });

  afterAll(() => {
    fs.rmdirSync(testDirPath);
  });

  it('should delete all files and directories in the directory but not the directory itself', async () => {
    /* Create a subdir */
    const subDirPath = path.join(testDirPath, 'subdir');
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
    await wipeDir(testDirPath, { recursive: true });

    expect(fs.existsSync(filePath)).toBe(false);
    expect(fs.existsSync(subDirPath)).toBe(false);
  });
});
