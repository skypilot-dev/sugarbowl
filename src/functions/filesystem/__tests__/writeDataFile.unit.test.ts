import fs from 'fs';
import os from 'os';
import path from 'path';
import { writeDataFile } from '../writeDataFile';

/* TODO: Test output by mocking stdout. */

const tmpDir = path.join(os.tmpdir(), 'writeDataFile-test');

beforeEach(async () => {
  await fs.promises.rmdir(tmpDir, { recursive: true });
  await fs.promises.mkdir(tmpDir, { recursive: true });
});

afterAll(async () => {
  await fs.promises.rmdir(tmpDir, { recursive: true });
})

describe('writeDataFile(data, filePath, options?)', () => {
  it('should return the data it was given', async () => {
    const originalData = ['a', 'b'];

    const { data } = await writeDataFile(originalData, 'fileName.json', { dryRun: true });

    expect(data).toBe(originalData);
  });

  it('should return the results', async () => {
    const data = ['a'];

    const result = await writeDataFile(data, '/var/fileName', { dryRun: true });

    const expected = {
      fileName: 'fileName.json',
      fullPath: '/var/fileName.json',
      shortestPath: '/var/fileName.json',
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

  it('given a basePath with a trailing slash, should treat it as a directory', async () => {
    const data = ['a'];

  const result = await writeDataFile(data, 'fileName', {
      basePath: 'base-path/',
      dryRun: true,
    });

    const expected = {
      fileName: 'fileName.json',
      fullPath: path.join(path.resolve(), 'base-path/fileName.json'),
    };
    expect(result).toMatchObject(expected);
  });

  it('given a basePath with no trailing slash, should concatenate it with the fileName', async () => {
    const data = ['a'];

    const result = await writeDataFile(data, 'fileName', {
      basePath: 'base-path-',
      dryRun: true,
    });

    const expected = {
      fileName: 'base-path-fileName.json',
      fullPath: path.join(path.resolve(), 'base-path-fileName.json'),
    };
    expect(result).toMatchObject(expected);
  });

  it('given a basePath with no trailing slash, should concatenate it with the fileName', async () => {
    const data = ['a'];

    const result = await writeDataFile(data, 'fileName', {
      basePath: 'base-path-',
      dryRun: true,
    });

    const expected = {
      fileName: 'base-path-fileName.json',
      fullPath: path.join(path.resolve(), 'base-path-fileName.json'),
    };
    expect(result).toMatchObject(expected);
  });

  it('given a basePath & a fileName with a preceding slash, should concatenate them', async () => {
    const data = ['a'];

    const result = await writeDataFile(data, '/fileName', {
      basePath: 'base-path',
      dryRun: true,
    });

    const expected = {
      fileName: 'fileName.json',
      fullPath: path.join(path.resolve(), 'base-path/fileName.json'),
    };
    expect(result).toMatchObject(expected);
  });

  it('should automatically create the directory path', async () => {
    const data = ['a'];

    const result = await writeDataFile(data, '/parent-dir/fileName', {
      basePath: tmpDir,
    });

    const expectedFilePath = path.join(path.resolve(tmpDir), 'parent-dir/fileName.json');
    const expected = {
      fileName: 'fileName.json',
      fullPath: expectedFilePath,
    };
    expect(fs.existsSync(expectedFilePath)).toBe(true);
    expect(result).toMatchObject(expected);
  });

  it('should not overwrite a file that exists', async () => {
    const data = ['a'];

    await writeDataFile(data, '/parent-dir/fileName', {
      basePath: tmpDir,
    });

    return expect(
      writeDataFile(data, '/parent-dir/fileName', { basePath: tmpDir })
    ).rejects.toThrow();
  });

  it('should overwrite a file that exists if `overwrite: true`', async () => {
    const data = {};

    await writeDataFile(data, '/parent-dir/fileName', {
      basePath: tmpDir,
    });

    return expect(writeDataFile(data, '/parent-dir/fileName', {
      basePath: tmpDir,
      overwrite: true,
    })).resolves.not.toThrow();
  });

  it('should overwrite a file that exists if `wipeDir: true`', async () => {
    const data = ['a'];

    await writeDataFile(data, '/parent-dir/fileName', {
      basePath: tmpDir,
    });

    return expect(writeDataFile(data, '/parent-dir/fileName', {
      addIsoDateTime: true,
      basePath: tmpDir,
      isoDateTimeResolution: 's',
      label: 'survey-response',
      verbose: true,
      wipeDir: true,
    })).resolves.not.toThrow();
  });
});
