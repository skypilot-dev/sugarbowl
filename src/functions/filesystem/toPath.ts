export type PathLike = string | string [];

export function toPath(path: PathLike): string {
  return Array.isArray(path) ? path.join(...path) : path;
}
