import fs from 'fs';
import path from 'path';
import util from 'util';

import { getFileSystemRoot, makeTestDir, makeTestRunDir } from 'src/functions';
import { makeDirForSafeWipe } from 'src/functions/filesystem/__tests__/helpers/makeDirForSafeWipe';
import { unixPathToOsPath } from '../../functions/filesystem/unixPathToOsPath';
import { Directory } from '../Directory';

const testRunDir = makeTestRunDir('Directory.unit');

describe('Directory class', () => {
  describe('instantiation', () => {
    it('should correctly set dirPath, fullPath & baseDirPath upon instantiation', async () => {
      const dir = new Directory('dir', { baseDir: testRunDir });
      expect(dir.baseName).toBe('dir');
      expect(dir.baseDirPath).toBe(testRunDir.fullPath);
      expect(dir.dirPath).toBe('dir');
      expect(dir.fullPath).toBe(path.resolve(testRunDir.fullPath, 'dir'));
    });

    it('given an empty dirPath, should throw', async () => {
      expect(() => {
        new Directory('', { baseDir: testRunDir });
      }).toThrow();
    });

    it("given '.' as the directory, should resolve to the baseDir", async () => {
      {
        const dir = new Directory('.', { baseDir: testRunDir });
        expect(dir.fullPath).toBe(path.resolve(testRunDir.fullPath));
      }
      {
        const dir = new Directory('.');
        expect(dir.fullPath).toBe(path.resolve());
      }
    });

    it("given '..' as the directory, should resolve to the parent of the baseDir", async () => {
      const dir = new Directory('..', { baseDir: testRunDir });
      const expectedPath = path.resolve(testRunDir.fullPath)
        .split(path.sep)
        .slice(0, -1)
        .join(path.sep);
      expect(dir.fullPath).toBe(expectedPath);
    });

    it("given '..' as the directory relative to the root directory, should return the root directory", async () => {
      // This mirrors the behaviour of `path.resolve()`
      const dir = new Directory('..', { baseDir: '/' });
      const expectedPath = path.resolve('/', '..');
      expect(dir.fullPath).toBe(expectedPath);
    });
  });

  describe('join()', () => {
    it("should join path segments to the Directory's path", () => {
      const baseDir = new Directory([getFileSystemRoot(), 'var', 'tmp']);
      {
        const relativePath = 'child';
        const expected = unixPathToOsPath('/var/tmp/child');

        const actual = baseDir.join(relativePath);
        expect(actual).toBe(expected);
      }
      {
        const relativePath = './child';
        const expected = unixPathToOsPath('/var/tmp/child');

        const actual = baseDir.join(relativePath);
        expect(actual).toBe(expected);
      }
    });

    it('given an absolute path, should treat it as a path segment (identically to path.join)', () => {
      const baseDir = new Directory(unixPathToOsPath('/var/tmp'));
      const absolutePath = '/sibling';
      const expected = unixPathToOsPath('/var/tmp/sibling');

      const actual = baseDir.join(absolutePath);
      expect(actual).toBe(expected);
    });

    it('should accept a series of PathLike elements', () => {
      const baseDir = new Directory(unixPathToOsPath('/var/tmp'));

      const actual = baseDir.join('level1', ['level2', 'level3'], '/level4');
      const expected = unixPathToOsPath('/var/tmp/level1/level2/level3/level4');
      expect(actual).toBe(expected);
    });
  });

  describe('make()', () => {
    it('should create the directory asynchronously', async () => {
      const testDir = makeTestDir('make', testRunDir);
      const dir = await new Directory('dir', { baseDir: testDir }).make();
      await expect(util.promisify(fs.exists)(dir.fullPath)).resolves.toBe(true);
      await expect(dir.exists()).resolves.toBe(true);
    });
  });

  describe('makeSync()', () => {
    it('should create the directory synchronously', async () => {
      const testDir = makeTestDir('makeSync', testRunDir);
      const dir = new Directory('dir', { baseDir: testDir }).makeSync();
      expect(fs.existsSync(dir.fullPath)).toBe(true);
      expect(dir.existsSync()).toBe(true);
    });
  });

  describe('relativeExists(targetPath: DirectoryLike)', () => {
    it("should return true if targetPath exists relative to the Directory's path, otherwise false", async () => {
      const baseDir = makeTestDir('relativeExists', testRunDir);
      const childDir = new Directory('child', { baseDir }).makeSync();
      const siblingDir = new Directory('sibling', { baseDir }).makeSync();

      // Check child
      const childDirs = ['child', './child', ['./child'], childDir.fullPath];
      for (const child of childDirs) {
        await expect(baseDir.relativeExists(child)).resolves.toBe(true);
        expect(baseDir.relativeExistsSync(child)).toBe(true);
      }

      // Check parent
      const parentDirs = ['..', ['..'], baseDir.fullPath];
      for (const parent of parentDirs) {
        await expect(childDir.relativeExists(parent)).resolves.toBe(true);
        expect(childDir.relativeExistsSync(parent)).toBe(true);
      }

      // Check sibling
      const siblingDirs = ['../sibling', ['../sibling'], siblingDir.fullPath];
      for (const sibling of siblingDirs) {
        await expect(childDir.relativeExists(sibling)).resolves.toBe(true);
        expect(childDir.relativeExistsSync(sibling)).toBe(true);
      }

      // Check self
      const selfDirs = ['.', '../child', ['.'], childDir.fullPath];
      for (const self of selfDirs) {
        await expect(childDir.relativeExists(self)).resolves.toBe(true);
        expect(childDir.relativeExistsSync(self)).toBe(true);
      }
    });

    describe('relativeFrom(targetPath: DirectoryLike)', () => {
      it("should return the relative path from the targetPath to the Directory's path", () => {
        const dir = new Directory(unixPathToOsPath('/var/tmp'));
        {
          const targetPath = unixPathToOsPath('/var/tmp/child1');
          const expected = '..';

          const actual = dir.relativeFrom(targetPath);
          expect(actual).toBe(expected);
        }
        {
          const targetPath = unixPathToOsPath('/var');
          const expected = 'tmp';

          const actual = dir.relativeFrom(targetPath);
          expect(actual).toBe(expected);
        }
        {
          const targetPath = unixPathToOsPath('/var/child2');
          const expected = '../tmp';

          const actual = dir.relativeFrom(targetPath);
          expect(actual).toBe(expected);
        }
        {
          const targetPath = unixPathToOsPath('/sibling');
          const expected = '../var/tmp';

          const actual = dir.relativeFrom(targetPath);
          expect(actual).toBe(expected);
        }
      });
    });

    describe('relativeTo(targetPath: DirectoryLike)', () => {
      it("should return the relative path from the Directory's path to targetPath", () => {
        const dir = new Directory(unixPathToOsPath('/var/tmp'));
        {
          const targetPath = unixPathToOsPath('/var/tmp/child1');
          const expected = 'child1';

          const actual = dir.relativeTo(targetPath);
          expect(actual).toBe(expected);
        }
        {
          const targetPath = unixPathToOsPath('/var');
          const expected = '..';

          const actual = dir.relativeTo(targetPath);
          expect(actual).toBe(expected);
        }
        {
          const targetPath = unixPathToOsPath('/var/child2');
          const expected = '../child2';

          const actual = dir.relativeTo(targetPath);
          expect(actual).toBe(expected);
        }
        {
          const targetPath = unixPathToOsPath('/sibling');
          const expected = '../../sibling';

          const actual = dir.relativeTo(targetPath);
          expect(actual).toBe(expected);
        }
      });
    });
  });

  describe('safeWipe(:SafeWipeOptions)', () => {
    it("unless `recursive?: false`, should remove the directory's files but not its subdirectories", async () => {
      // Create a directory & subdirectory
      const { baseDir, baseFilePath, subDir, subFilePath } = makeDirForSafeWipe('safeWipe', testRunDir);

      // Wipe the directory
      await baseDir.safeWipe();

      expect(fs.existsSync(baseFilePath)).toBe(false);
      expect(fs.existsSync(subFilePath)).toBe(true);

      // Wipe the directory recursively
      await baseDir.safeWipe({ recursive: true });

      expect(fs.existsSync(baseDir.fullPath)).toBe(true);
      expect(fs.existsSync(baseFilePath)).toBe(false);
      expect(fs.existsSync(subDir.fullPath)).toBe(false);
    });
  });

  describe('safeWipeSync(:SafeWipeOptions)', () => {
    it("unless `recursive?: false`, should remove the directory's files but not its subdirectories", () => {
      // Create a directory & subdirectory
      const { baseDir, baseFilePath, subDir, subFilePath } = makeDirForSafeWipe('safeWipeSync', testRunDir);

      // Wipe the directory
      baseDir.safeWipeSync();

      expect(fs.existsSync(baseFilePath)).toBe(false);
      expect(fs.existsSync(subFilePath)).toBe(true);

      // Wipe the directory recursively
      baseDir.safeWipeSync({ recursive: true });

      expect(fs.existsSync(baseDir.fullPath)).toBe(true);
      expect(fs.existsSync(baseFilePath)).toBe(false);
      expect(fs.existsSync(subDir.fullPath)).toBe(false);
    });
  });

  describe('baseDirPath', () => {
    it('should return the path to `baseDir`', () => {
      {
        const dir = new Directory('dirName');
        expect(dir.baseDirPath).toBe(path.resolve());
      }
      {
        const dir = new Directory('dirName', { baseDir: testRunDir });
        expect(dir.baseDirPath).toBe(testRunDir.fullPath);
      }
    });
  });

  describe('dirPathRoot', () => {
    it('should return the full path to the first segment in the path', () => {
      {
        const relPath = 'dirPathRoot';
        const dir = new Directory(relPath);

        expect(dir.dirPathRoot).toBe(path.resolve('dirPathRoot'));
      }
      {
        const relPath = ['dirPathRoot', 'pathChild'];
        const dir = new Directory(relPath);

        expect(dir.dirPathRoot).toBe(path.resolve('dirPathRoot'));
      }
    });

    it('given a baseDir, should include it in the full path to the first segment', () => {
      const relPath = ['dirPathRoot', 'pathChild'];
      const dir = new Directory(relPath, { baseDir: testRunDir });

      expect(dir.dirPathRoot).toBe(path.resolve(testRunDir.fullPath, 'dirPathRoot'));
    });

    it("given an initial path of '.', should return the baseDir", () => {
      const dir = new Directory('.', { baseDir: testRunDir });
      expect(dir.dirPathRoot).toBe(testRunDir.fullPath);
    });
  });

  describe('shortestPathFromBaseDir', () => {
    it('should return the shortest path from `baseDir` to `dirPath`', () => {
      {
        const dir = new Directory('/dir1/subdir', { baseDir: '../../dir2/subdir' });
        const expectedPath = '/dir1/subdir';
        expect(dir.shortestPathFromBaseDir).toBe(expectedPath);
      }
      {
        const dir = new Directory('/dir/subdir2', { baseDir: '/dir/subdir1' });
        const expectedPath = '../subdir2';
        expect(dir.shortestPathFromBaseDir).toBe(expectedPath);
      }
    });
  });

  describe('shortestPathToBaseDir', () => {
    it('should return the shortest path from `baseDir` to `dirPath`', () => {
      {
        const dir = new Directory('subdir/subsubdir', { baseDir: 'subdir' });
        const expectedPath = '../..';
        expect(dir.shortestPathToBaseDir).toBe(expectedPath);
      }
      {
        const dir = new Directory('/dir/subdir2', { baseDir: '/dir/subdir1' });
        const expectedPath = '../subdir1';
        expect(dir.shortestPathToBaseDir).toBe(expectedPath);
      }
      {
        const dir = new Directory('subdir/subsubdir', { baseDir: '/dir' });
        const expectedPath = '/dir';
        expect(dir.shortestPathToBaseDir).toBe(expectedPath);
      }
    });
  });
});
