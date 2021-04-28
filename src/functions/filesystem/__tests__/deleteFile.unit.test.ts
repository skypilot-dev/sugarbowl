import fs from 'fs';
import path from 'path';

import { randomAlphanumeric } from 'src/functions/string';

import { deleteFile } from '../deleteFile';
import { makeTempDir } from '../makeTempDir';

const tempDir = makeTempDir('deleteFile');

describe('deleteFile()', () => {
  it('if the file exists, should delete it and return its full path', () => {
    const filePath = path.join(tempDir, `deleteFile-${randomAlphanumeric()}.json`);
    fs.writeFileSync(filePath, JSON.stringify({}), { encoding: 'utf-8' });

    const result = deleteFile(filePath);

    expect(result).toBe(path.resolve(filePath));
  });

  it('given a relative path, should nonetheless return the absolute path', () => {
    const dirPath = path.resolve('tmp');
    fs.mkdirSync(dirPath, { recursive: true });
    const filePath = path.join('tmp', `deleteFile-${randomAlphanumeric()}.json`);
    fs.writeFileSync(filePath, JSON.stringify({}), { encoding: 'utf-8' });

    const result = deleteFile(filePath);

    expect(result).toBe(path.resolve(filePath));
  });

  it('if the file does not exist, should return an empty string', () => {
    const filePath = path.join(tempDir, 'nonexistent-file');

    const result = deleteFile(filePath);

    expect(result).toBe('');
  });
});
