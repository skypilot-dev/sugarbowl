import path from 'node:path';

import { afterAll, describe, expect, it } from 'vitest';

import { makeTempDir } from '~/src/functions/filesystem/makeTempDir.js';
import { safeWipeSync } from '~/src/functions/filesystem/safeWipeSync.js';

const baseDir = makeTempDir('makeTempDir.unit', { addRandomSuffix: true, dateTimeFormat: 'compact' });

describe('makeTempDir(relativePath:string, options)', () => {
  afterAll(async () => safeWipeSync(baseDir, { remove: true }));

  it('should create a temporary directory and return the path to it', () => {

    const subDirName = 'test1';
    const subDirPath = makeTempDir(subDirName, { baseDir });

    expect(subDirPath).toBe(path.resolve(baseDir, subDirPath));
    expect(subDirPath.endsWith(subDirName)).toBe(true);
  });

  it('when a dateTimeFormat is given, should add a timestamp to the directory name', () => {
    const relativeDirName = 'random';
    const subDirPath = makeTempDir(relativeDirName, { baseDir, dateTimeFormat: 'compact' });
    const subDirName = path.basename(subDirPath);

    expect(subDirPath.startsWith(path.join(baseDir, subDirName))).toBe(true);
    expect(subDirName).toMatch(/random_[0-9]{8}-[0-9]{6}/);
  });

  it('when `addRandomSuffix:true`, should add a random suffix to the name of the directory', () => {
    const subDirName = 'random';
    const subDirPath = makeTempDir(subDirName, { baseDir, addRandomSuffix: true });

    expect(subDirPath.startsWith(path.join(baseDir, subDirName))).toBe(true);
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
