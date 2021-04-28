import fs from 'fs';
import path from 'path';

/* INTERNAL FUNCTION. Remove the directory and all its contents.
   This emulates `fs.rmdirSync(path, { recursive: true })`, available in Node v12+.
   TODO: Remove when Sugarbowl no longer supports Node v10.x
 */
export function rmDirSync(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    return;
  }
  const childNames = fs.readdirSync(dirPath);
  childNames.forEach(childName => {
    const childPath = path.join(dirPath, childName);
    if (fs.lstatSync(childPath).isDirectory()) {
      rmDirSync(childPath);
    } else {
      fs.unlinkSync(childPath);
    }
  });
  fs.rmdirSync(dirPath); // Use the Node `rmdirSync` function to remove the directory itself
}
