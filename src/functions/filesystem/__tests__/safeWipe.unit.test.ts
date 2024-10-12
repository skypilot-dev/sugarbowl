import fs from 'node:fs';

import { describe, expect, it } from 'vitest';

import { makeDirForSafeWipe } from './helpers/makeDirForSafeWipe.js';

import { safeWipe } from '~/src/functions/filesystem/safeWipe.js';
import { makeTempDir, makeTestRunDir } from '~/src/functions/index.js';

const suiteName = 'safeWipeSync.unit';
const testRunDir = makeTestRunDir(suiteName);

/*
  This test suite overlaps significantly with those of `Directory` & `safeWipeSync`, but this may
  be unavoidable because of the thorough testing needed for a potentially dangerous function.
 */

describe('safeWipe(dirPath: PathLike)', () => {
  it('if the directory is outside the permitted boundary, should reject', async () => {
    const badDirs = [
      '/outside-boundary',
      '',
      'tmp-2',
    ];
    for (const badDir of badDirs) {
      await expect(
        safeWipe(badDir),
      ).rejects.toThrow('Cannot wipe');
    }
  });

  it('if the directory does not exist, should return the result but do nothing', async () => {
    const dirFullPath = makeTempDir('nonexistent-dir', { dryRun: true });
    const expected = {
      fullPath: dirFullPath,
      status: 'directory not found',
    };

    const actual = await safeWipe(dirFullPath);
    expect(actual).toStrictEqual(expected);
  });

  it('if `dryRun: true`, should return the result but do nothing ', async () => {
    const { baseDir, baseFilePath, subFilePath } = makeDirForSafeWipe('dryRun', testRunDir);
    const options = { dryRun: true, recursive: true };
    const expected = {
      fullPath: baseDir.fullPath,
      status: 'dry run',
    };

    const actual = await safeWipe(baseDir.fullPath, options);

    expect(actual).toStrictEqual(expected);
    expect(fs.existsSync(baseFilePath)).toBe(true);
    expect(fs.existsSync(subFilePath)).toBe(true);
  });

  it("if `recursive?: false`, should delete the directory's files but not its subdirectories", async () => {
    const { baseDir, baseFilePath, subFilePath } = makeDirForSafeWipe('recursive-false', testRunDir);
    const options = { recursive: false };
    const expected = {
      fullPath: baseDir.fullPath,
      status: 'OK',
    };

    const actual = await safeWipe(baseDir.fullPath, options);

    expect(actual).toStrictEqual(expected);
    expect(fs.existsSync(baseFilePath)).toBe(false);
    expect(fs.existsSync(subFilePath)).toBe(true);
  });

  it('if `recursive: true`, should remove all files and directories in the directory but not the directory itself', async () => {
    const { baseDir, baseFilePath, subDir } = makeDirForSafeWipe('recursive-true', testRunDir);
    const options = { recursive: true };
    const expected = {
      fullPath: baseDir.fullPath,
      status: 'OK',
    };

    const actual = await safeWipe(baseDir.fullPath, options);

    expect(actual).toStrictEqual(expected);
    expect(fs.existsSync(baseDir.fullPath)).toBe(true);
    expect(fs.existsSync(baseFilePath)).toBe(false);
    expect(fs.existsSync(subDir.fullPath)).toBe(false);
  });

  it('if `remove: true`, should remove the entire directory', async () => {
    const { baseDir } = makeDirForSafeWipe('remove-true', testRunDir);
    const options = { remove: true };
    const expected = {
      fullPath: baseDir.fullPath,
      status: 'OK',
    };

    const actual = await safeWipe(baseDir.fullPath, options);

    expect(actual).toStrictEqual(expected);
    expect(fs.existsSync(baseDir.fullPath)).toBe(false);
  });
});
