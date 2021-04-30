import path from 'path';

import { getFileSystemRoot, includeIf, toPath } from 'src/functions';
import type { PathLike } from 'src/functions';

export function unixPathToOsPath(filePath: PathLike): string {
  const unixPath = toPath(filePath);

  const isAbsolute = unixPath.startsWith('/');

  const elements = isAbsolute
    ? unixPath.split('/')
    : unixPath.slice(1).split('/');

  return [
    ...includeIf(isAbsolute, getFileSystemRoot()),
    elements.join(path.sep),
  ].join('');
}
