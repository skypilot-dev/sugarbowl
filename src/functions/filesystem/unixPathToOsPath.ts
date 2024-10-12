import path from 'node:path';

import type { PathLike } from 'src/functions/index.js';
import { getFileSystemRoot, includeIf, toPath } from 'src/functions/index.js';

export function unixPathToOsPath(filePath: PathLike): string {
  const unixPath = toPath(filePath);

  const isAbsolute = unixPath.startsWith('/');

  const elements = isAbsolute ? unixPath.slice(1).split('/') : unixPath.split('/');

  return [
    ...includeIf(isAbsolute, getFileSystemRoot()),
    elements.join(path.sep),
  ].join('');
}
