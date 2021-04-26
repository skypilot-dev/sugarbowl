import fs from 'fs';
import path from 'path';

import { toArray } from 'src/functions/array';

export interface ListFilesOptions {
  fileNamePattern?: RegExp | string;
  pathFormat?: 'join' | 'resolve' | 'relative';
  sort?: (filePathA: string, filePathB: string) => number;
}

// TODO: Handle a nonexistent directory path

export function listFilesSync(dirPath: string | string[], options: ListFilesOptions = {}): string[] {
  const {
    fileNamePattern,
    sort = (a, b) => a.localeCompare(b),
    pathFormat = 'join',
  } = options;

  const pattern = typeof fileNamePattern === 'string'
    ? new RegExp(fileNamePattern)
    : (fileNamePattern || /.*/);

  const pathSegments = toArray(dirPath);

  const dirFullPath = path.resolve(...pathSegments);
  const fileNames = fs.readdirSync(dirFullPath)
    .filter(relativeFsoPath => fs.statSync(path.join(...pathSegments, relativeFsoPath)).isFile())
    .filter(fileName => pattern.test(fileName))
    .sort(sort);

  switch (pathFormat) {
    case 'join':
      return fileNames.map(fileName => path.join(...pathSegments, fileName));
    case 'relative':
      return fileNames;
    case 'resolve':
      return fileNames.map(fileName => path.resolve(...pathSegments, fileName));
    default:
      throw new Error(`Unrecognized pathFormat: '${pathFormat}'`);
  }
}
