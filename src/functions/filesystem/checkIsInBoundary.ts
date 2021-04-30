import path from 'path';

import { toArray } from '../array';
import { checkIsChildPath } from './checkIsChildPath';
import { PathLike, toPath } from './toPath';

export interface FileSystemBoundary {
  path: string;
  scope?: FileSystemScope | FileSystemScope[];
}


export type FileSystemScope = 'children' | 'self';

export function checkIsInBoundary(
  targetPath: PathLike, boundary: FileSystemBoundary
): boolean {
  // Normalize arguments
  const boundaryFullPath = toPath(boundary.path);
  const targetFullPath = toPath(targetPath);
  const scopes = toArray(boundary.scope || ['children', 'self']);

  if (scopes.includes('self') && (path.resolve(toPath(targetPath)) === path.resolve(toPath(boundary.path)))) {
    return true;
  }
  if (scopes.includes('children') && checkIsChildPath(targetFullPath, boundaryFullPath)) {
    return true;
  }
  return false;
}

// For use in error messages, for example
export function boundariesToString(boundaries: FileSystemBoundary[]): string {
  return boundaries.length === 1
    ? boundaries[0].path
    : `[${boundaries.map(boundary => `\n\t${boundary.path}`)}\n]`;
}
