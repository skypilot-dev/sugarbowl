import fs from 'fs';
import path from 'path';

// Delete the file if it exists and return its absolute path; otherwise, return an empty string
export function deleteFile(filePath: string): string {
  const fullPath = path.resolve(filePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    return fullPath;
  }
  return '';
}
