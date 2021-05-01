import fs from 'fs';
import path from 'path';

import { toPath } from 'src/functions';
import type { PathLike } from 'src/functions';

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
