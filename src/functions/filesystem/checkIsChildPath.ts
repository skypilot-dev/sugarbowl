import path from 'node:path';

import { toArray } from '~/src/functions/array/toArray.js';

// Return true if the childPath is within the parentPath
export function checkIsChildPath(childPath: string | string[], parentPath: string | string[]): boolean {
  const childFullPath = path.resolve(...toArray(childPath));
  const parentFullPath = path.resolve(...toArray(parentPath));

  return childFullPath.startsWith(`${parentFullPath}${path.sep}`);
}
