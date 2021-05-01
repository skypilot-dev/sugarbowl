import path from 'path';

import { includeIf, toArray } from '../array';
import { checkIsChildPath } from './checkIsChildPath';
import { PathLike, toPath } from './toPath';

export interface FileSystemBoundary {
  path: string;
  scope?: FileSystemScope | FileSystemScope[];
}


export type FileSystemScope = 'children' | 'self';

function boundariesToString(boundaries: FileSystemBoundary[]): string {
  return boundaries.length === 1
    ? boundaries[0].path
    : `${boundaries.map(boundary => `\n  ${describeBoundary(boundary)}`).join('')}`;
}

function checkBoundary(targetPath: PathLike, boundary: FileSystemBoundary): boolean {
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

function describeBoundary(boundary: FileSystemBoundary): string {
  const boundaryPath = path.resolve(boundary.path);
  return [
    ...includeIf(boundary.scope?.includes('self'), boundaryPath),
    ...includeIf(boundary.scope?.includes('children'), `${boundaryPath}/*`),
  ].join(' ');
}

export function makeBoundaryErrorMessage(dirPath: string, operation: string, boundaries: FileSystemBoundary[]): string {
  return `Cannot ${operation} '${dirPath}'; the path is outside the permitted boundary: ${boundariesToString(boundaries)}`;
}

export function checkIsInBoundary(targetPath: PathLike, boundary: FileSystemBoundary | FileSystemBoundary[]): boolean {
  const boundaries = toArray(boundary);
  return boundaries.some(b => checkBoundary(targetPath, b));
}
