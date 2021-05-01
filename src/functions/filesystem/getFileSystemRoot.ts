import path from 'path';
import { PathLike, toPath } from './toPath';

export function getFileSystemRoot(targetPath?: PathLike | undefined): string {
  const resolvedPath = path.resolve(targetPath ? toPath(targetPath) : '');
  return path.parse(resolvedPath).root;
}
