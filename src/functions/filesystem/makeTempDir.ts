import fs from 'fs';
import os from 'os';
import path from 'path';
import { toArray } from '../array';
import { randomAlphanumeric } from '../string';

interface MakeTempDirOptions {
  baseDir?: string | string[];
  disallowExisting?: boolean;
  addRandomSuffix?: boolean;
}

export function makeTempDir(relativePath: string, options: MakeTempDirOptions = {}): string {
  /* TODO: Validate the relative path */
  if (!relativePath) {
    throw new Error('The relative path cannot be an empty string');
  }

  const { baseDir = [], disallowExisting, addRandomSuffix } = options;
  const basePaths = toArray(baseDir);

  const tmpDir = os.tmpdir();
  const subDir = addRandomSuffix ? `${relativePath}-${randomAlphanumeric()}` : relativePath;
  const dirPath = path.join(
    tmpDir,
    ...(basePaths),
    subDir
  );

  if (fs.existsSync(dirPath)) {
    if (disallowExisting) {
      throw new Error(`The subdirectory '${relativePath}' already exists`);
    }
  } else {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
}
