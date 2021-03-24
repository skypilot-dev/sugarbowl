import fs from 'fs';
import os from 'os';
import path from 'path';

import { readPackageFile } from '../readPackageFile';
import { writePackageFile } from '../writePackageFile';

const pathToFile = path.join(os.tmpdir(), 'writePackageFile.package.json');

beforeAll(() => {
  if (fs.existsSync(pathToFile)) {
    fs.unlinkSync(pathToFile);
  }
});

afterAll(() => {
  fs.unlinkSync(pathToFile);
});

describe('writePackageFile()', () => {
  it('should write the object to a JSON file', () => {
    const content = { version: '9.9.9' };

    writePackageFile({ content, pathToFile });

    const readData = readPackageFile({ pathToFile });
    expect(readData).toEqual(content);
    expect(readData).not.toBe(content);
  });
});
