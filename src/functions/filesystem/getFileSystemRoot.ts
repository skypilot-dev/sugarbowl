import path from 'node:path';

import type { PathLike } from '~/src/functions/filesystem/toPath.js';
import { toPath } from '~/src/functions/filesystem/toPath.js';

export function getFileSystemRoot(targetPath?: PathLike | undefined): string {
  const resolvedPath = path.resolve(targetPath ? toPath(targetPath) : '');
  return path.parse(resolvedPath).root;
}
