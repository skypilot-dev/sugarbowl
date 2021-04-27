import fs from 'fs';
import os from 'os';
import path from 'path';

import { toArray } from '../array';
import { DateTimeStampOptions, DateTimeStampPresetCode, makeDateTimeStamp } from '../date';
import { randomAlphanumeric } from '../string';
import { composeFileName } from './composeFileName';

interface MakeTempDirOptions {
  addRandomSuffix?: boolean;
  baseDir?: string | string[];
  dateTimeFormat?: DateTimeStampPresetCode | DateTimeStampOptions | null | undefined;
  disallowExisting?: boolean;
  separator?: string;
}

export function makeTempDir(relativePath: string, options: MakeTempDirOptions = {}): string {
  /* TODO: Validate the relative path */
  if (!relativePath) {
    throw new Error('The relative path cannot be an empty string');
  }

  const { baseDir = [], dateTimeFormat, disallowExisting, addRandomSuffix, separator = '_' } = options;
  const basePaths = toArray(baseDir);

  const tmpDir = os.tmpdir();
  const subDir = composeFileName([
    relativePath,
    ...(dateTimeFormat ? [makeDateTimeStamp(dateTimeFormat)] : []),
    ...(addRandomSuffix ? [randomAlphanumeric()] : []),
  ], { separator });
  const dirPath = path.resolve(
    tmpDir,
    ...basePaths,
    subDir
  );

  if (fs.existsSync(dirPath)) {
    if (disallowExisting) {
      throw new Error(`The subdirectory '${subDir}' already exists`);
    }
  } else {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
}
