import fs from 'node:fs';
import path from 'node:path';

import type { PathLike } from 'src/functions/index.js';
import { toPath } from 'src/functions/index.js';

export interface DeleteFileResult {
  fullPath: string;
  status: 'OK' | 'file not found';
}

// Delete the file if it exists and return its absolute path; otherwise, return an empty string
export function deleteFileSync(filePath: PathLike): DeleteFileResult {
  const fullPath = path.resolve(toPath(filePath));
  const fileExists = fs.existsSync(fullPath);
  if (fileExists) {
    fs.unlinkSync(fullPath);
  }
  return {
    fullPath,
    status: fileExists ? 'OK' : 'file not found',
  };
}
