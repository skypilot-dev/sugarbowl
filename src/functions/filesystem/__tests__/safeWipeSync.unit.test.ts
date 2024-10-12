import fs from 'node:fs';

import { makeTempDir, makeTestRunDir } from 'src/functions/index.js';
import { describe, expect, it } from 'vitest';

import { makeDirForSafeWipe } from './helpers/makeDirForSafeWipe.js';

import { safeWipeSync } from '~/src/functions/filesystem/safeWipeSync.js';

const suiteName = 'safeWipeSync.unit';
const testRunDir = makeTestRunDir(suiteName);

describe('safeWipeSync(dirPath: PathLike)', () => {
  it('if the directory is outside the permitted boundary, should throw', () => {
    const badDirs = [
      '/outside-boundary',
      '',
      'tmp-2',
    ];
    for (const badDir of badDirs) {
      expect(() => {
        safeWipeSync(badDir);
      }).toThrow('Cannot wipe');
    }
  });

  it('if the directory does not exist, should return the result but do nothing', () => {
    const dirFullPath = makeTempDir('nonexistent-dir', { dryRun: true });
    const expected = {
      fullPath: dirFullPath,
      status: 'directory not found',
    };

    const actual = safeWipeSync(dirFullPath);
    expect(actual).toStrictEqual(expected);
  });

  it('if `dryRun: true`, should return the result but do nothing ', () => {
    const { baseDir, baseFilePath, subFilePath } = makeDirForSafeWipe('dryRun', testRunDir);
    const options = { dryRun: true, recursive: true };
    const expected = {
      fullPath: baseDir.fullPath,
      status: 'dry run',
    };

    const actual = safeWipeSync(baseDir.fullPath, options);

    expect(actual).toStrictEqual(expected);
    expect(fs.existsSync(baseFilePath)).toBe(true);
    expect(fs.existsSync(subFilePath)).toBe(true);
  });

  it("if `recursive?: false`, should remove the directory's files but not its subdirectories", () => {
    const { baseDir, baseFilePath, subFilePath } = makeDirForSafeWipe('recursive-false', testRunDir);
    const options = { recursive: false };
    const expected = {
      fullPath: baseDir.fullPath,
      status: 'OK',
    };

    const actual = safeWipeSync(baseDir.fullPath, options);

    expect(actual).toStrictEqual(expected);
    expect(fs.existsSync(baseFilePath)).toBe(false);
    expect(fs.existsSync(subFilePath)).toBe(true);
  });

  it('if `recursive: true`, should remove all files and directories in the directory but not the directory itself', () => {
    const { baseDir, baseFilePath, subDir } = makeDirForSafeWipe('recursive-true', testRunDir);
    const options = { recursive: true };
    const expected = {
      fullPath: baseDir.fullPath,
      status: 'OK',
    };

    const actual = safeWipeSync(baseDir.fullPath, options);

    expect(actual).toStrictEqual(expected);
    expect(fs.existsSync(baseDir.fullPath)).toBe(true);
    expect(fs.existsSync(baseFilePath)).toBe(false);
    expect(fs.existsSync(subDir.fullPath)).toBe(false);
  });

  it('if `remove: true`, should remove the entire directory', () => {
    const { baseDir } = makeDirForSafeWipe('remove-true', testRunDir);
    const options = { remove: true };
    const expected = {
      fullPath: baseDir.fullPath,
      status: 'OK',
    };

    const actual = safeWipeSync(baseDir.fullPath, options);

    expect(actual).toStrictEqual(expected);
    expect(fs.existsSync(baseDir.fullPath)).toBe(false);
  });
});
