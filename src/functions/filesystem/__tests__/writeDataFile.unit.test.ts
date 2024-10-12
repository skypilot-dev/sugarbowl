import fs from 'node:fs';
import path from 'node:path';

import { getFileSystemRoot, makeTestDir, makeTestRunDir } from 'src/functions/index.js';
import { describe, expect, it } from 'vitest';

import { unixPathToOsPath } from '~/src/functions/filesystem/unixPathToOsPath.js';
import { writeDataFile } from '~/src/functions/filesystem/writeDataFile.js';

/* TODO: Test output by mocking stdout. */

const fileSystemRoot = getFileSystemRoot();
const testRunDir = makeTestRunDir('writeDataFile.unit');

describe('writeDataFile(data, filePath, options?)', () => {
  it('should return the data it was given', async () => {
    const originalData = ['a', 'b'];
    const filePath = 'fileName';
    const options = { dryRun: true };

    const { data } = await writeDataFile(originalData, filePath, options);

    expect(data).toBe(originalData);
  });

  it('should return the results', async () => {
    const data = ['a'];
    const fileName = 'fileName';
    const filePath = [fileSystemRoot, 'var', 'tmp', fileName];
    const options = { dryRun: true };

    const result = await writeDataFile(data, filePath, options);

    const expected = {
      fileName: 'fileName.json',
      fullPath: unixPathToOsPath('/var/tmp/fileName.json'),
      shortestPath: unixPathToOsPath('/var/tmp/fileName.json'),
    };
    expect(result).toMatchObject(expected);
  });

  it('should resolve relative paths relative to the project directory', async () => {
    const data = ['a'];

    const result = await writeDataFile(data, 'fileName', { dryRun: true });

    const expected = {
      data,
      fileName: 'fileName.json',
      fullPath: path.join(path.resolve(), 'fileName.json'),
    };
    expect(result).toMatchObject(expected);
  });

  it('given a baseDir, should resolve filePath relative to it', async () => {
    const baseDir = unixPathToOsPath('/var/tmp');
    const data = ['a'];
    const fileName = 'fileName';
    const options = { baseDir, dryRun: true };
    const expected = {
      fileName: 'fileName.json',
      fullPath: unixPathToOsPath('/var/tmp/fileName.json'),
    };

    const actual = await writeDataFile(data, fileName, options);

    expect(actual).toMatchObject(expected);
  });

  it('should automatically create the directory path', async () => {
    const testDir = makeTestDir('automatically-create-directory', testRunDir);
    const data = ['a'];
    const options = { baseDir: [testDir.fullPath, 'dir'] };
    const filePath = ['subdir', 'fileName'];
    const expected = {
      fileName: 'fileName.json',
      fullPath: path.resolve(testDir.fullPath, 'dir', 'subdir', 'fileName.json'),
    };

    const actual = await writeDataFile(data, filePath, options);

    expect(fs.existsSync(expected.fullPath)).toBe(true);
    expect(actual).toMatchObject(expected);
  });

  it('if the file exists and `overwrite?: false`, should reject', async () => {
    const testDir = makeTestDir(['overwrite', 'false'], testRunDir);
    const data = ['a'];
    const filePath = 'fileName';
    const options = { baseDir: testDir };

    // Write the file once
    await writeDataFile(data, filePath, options);

    // Attempt to write it again
    await expect(
      writeDataFile(data, filePath, options)
    ).rejects.toThrow();
  });

  it('if the file exists and `overwrite: true`, should overwrite', async () => {
    const testDir = makeTestDir(['overwrite', 'true'], testRunDir);
    const data = {};
    const filePath = 'fileName';
    const options = { baseDir: testDir, overwrite: true };

    await writeDataFile(data, filePath, options);

    // Attempt to write the file again
    await expect(writeDataFile(data, filePath, options))
      .resolves.not.toThrow();
  });
});
