import fs from 'fs';
import path from 'path';

import { makeTempDir } from '../makeTempDir';
import { rmDir } from '../rmDir';
import { wipeDir } from '../wipeDir';

const baseDir = 'makeTempDir';

/* Create a single directory in which to create any other directories */
const tmpDir = makeTempDir(baseDir);
beforeAll(() => fs.existsSync(tmpDir) && wipeDir(tmpDir));
afterAll(() => fs.existsSync(tmpDir) && rmDir(tmpDir));

describe('makeTempDir(relativePath:string, options)', () => {
  it('should create a temporary directory and return the path to it', () => {
    const subDirName = 'test1';
    const subDirPath = makeTempDir(subDirName, { baseDir });

    expect(subDirPath).toBe(path.resolve(tmpDir, subDirPath));
    expect(subDirPath.endsWith(subDirName)).toBe(true);
  });

  it('when a dateTimeFormat is given, should add a timestamp to the directory name', () => {
    const relativeDirName = 'random';
    const subDirPath = makeTempDir(relativeDirName, { baseDir, dateTimeFormat: 'compact' });
    const subDirName = path.basename(subDirPath);

    expect(subDirPath.startsWith(path.join(tmpDir, subDirName))).toBe(true);
    expect(subDirName).toMatch(/random_[0-9]{8}-[0-9]{6}/);
  });

  it('when `addRandomSuffix:true`, should add a random suffix to the name of the directory', () => {
    const subDirName = 'random';
    const subDirPath = makeTempDir(subDirName, { baseDir, addRandomSuffix: true });

    expect(subDirPath.startsWith(path.join(tmpDir, subDirName))).toBe(true);
    expect(subDirPath.endsWith(subDirName)).toBe(false);
  });

  it('can have no relative path, if a random suffix or time stamp is enabled', () => {
    expect(() => makeTempDir('', { baseDir, addRandomSuffix: true })).not.toThrow();
    expect(() => makeTempDir('', { baseDir, dateTimeFormat: 'compact' })).not.toThrow();
  });

  it('when the relative path is empty and the random-suffix & time-stamp options are disabled, should throw', () => {
    expect(() => {
      makeTempDir('', { baseDir });
    }).toThrow();
  });

  it('when `disallowExisting: true` and the directory already exists, should throw an error', () => {
    const subDirName = 'test2';

    makeTempDir(subDirName, { baseDir, addRandomSuffix: false });
    expect(() => makeTempDir(subDirName, { baseDir })).not.toThrow();
    expect(() => makeTempDir(subDirName, { baseDir, disallowExisting: true })).toThrow();
  });

  it('can created nested directories', () => {
    const subDirName = 'test3/subdir';

    makeTempDir(subDirName, { baseDir });
    expect(() => makeTempDir(subDirName, { baseDir })).not.toThrow();
    expect(() => makeTempDir(subDirName, { baseDir, disallowExisting: true })).toThrow();
  });
});
