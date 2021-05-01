import fs from 'fs';
import path from 'path';
import util from 'util';

import { makeTestDir, makeTestRunDir } from 'src/functions';
import { makeDirForSafeWipe } from 'src/functions/filesystem/__tests__/helpers/makeDirForSafeWipe';
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
