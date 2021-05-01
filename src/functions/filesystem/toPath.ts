import path from 'path';

export type PathLike = string | string [];

export function toPath(filePath: PathLike): string {
  return Array.isArray(filePath) ? path.join(...filePath) : filePath;
}
