import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import type { DateTimeStampOptions, DateTimeStampPresetCode, PathLike } from 'src/functions/index.js';
import { composeFileName, makeDateTimeStamp, randomAlphanumeric, toArray, toPath } from 'src/functions/index.js';

interface MakeTempDirOptions {
  addRandomSuffix?: boolean;
  baseDir?: PathLike;
  dateTimeFormat?: DateTimeStampPresetCode | DateTimeStampOptions | null | undefined;
  disallowExisting?: boolean;
  dryRun?: boolean;
  separator?: string;
  verbose?: boolean;
}

// Create a directory in the operating system's temporary-files directory and return its full path
export function makeTempDir(relativePath: PathLike = '', options: MakeTempDirOptions = {}): string {
  const {
    addRandomSuffix,
    baseDir = [],
    dateTimeFormat,
    disallowExisting,
    dryRun = false,
    separator = '_',
    verbose = false,
  } = options;

  /* TODO: Validate the relative path */
  if (!relativePath && !dateTimeFormat && !addRandomSuffix) {
    throw new Error('The relative path cannot be empty unless a time stamp or random suffix is added');
  }

  const basePaths = toArray(baseDir);

  const tmpDir = os.tmpdir();
  const subDir = composeFileName([
    ...(relativePath ? [toPath(relativePath)] : []),
    ...(dateTimeFormat ? [makeDateTimeStamp(dateTimeFormat)] : []),
    ...(addRandomSuffix ? [randomAlphanumeric(4)] : []),
  ], { separator });
  const dirPath = path.resolve(
    tmpDir,
    ...basePaths,
    subDir,
  );

  const dirExists = fs.existsSync(dirPath);
  if (dirExists) {
    if (disallowExisting) {
      throw new Error(`The subdirectory '${subDir}' already exists`);
    }
  } else if (!dryRun) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  if (verbose) {
    if (dirExists) {
      console.info(`Reusing temporary directory: '${dirPath}'`);
    } else {
      console.info(`Temporary directory created: '${dirPath}'`);
    }
  }
  return dirPath;
}
