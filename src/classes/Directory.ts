import fs from 'fs';
import path from 'path';
import util from 'util';

import { safeWipe, safeWipeSync } from 'src/functions';
import type { FileSystemBoundary, PathLike, SafeWipeOptions, SafeWipeResult } from 'src/functions';
import { isDefined } from 'src/functions/indefinite/isDefined';
import { defaultSafeWipeBoundaries } from '../functions/filesystem/_constants';

export type DirectoryLike = PathLike | Directory;

interface DirectoryOptions {
  baseDir?: DirectoryLike;
  protect?: boolean;
  safeWipeBoundaries?: FileSystemBoundary[];
}

export interface DirectoryProtectionOptions {
  unprotect?: boolean;
}

export type DirectoryWipeOptions = SafeWipeOptions & DirectoryProtectionOptions;

export class Directory {
  isProtected: boolean; // if true, protect from wiping and deletion unless `force: true` is passed
  safeWipeBoundaries: FileSystemBoundary[];

  private readonly _baseDirPath: string; // path to `baseDir`
  private readonly _dirPath: string; // as originally specified relative to `baseDir`
  private readonly _fullPath: string;

  constructor(dirPath: DirectoryLike, options: DirectoryOptions = {}) {
    const { baseDir, protect = false, safeWipeBoundaries = defaultSafeWipeBoundaries } = options;

    const stringDirPath = Directory.toPath(dirPath);
    if (!stringDirPath) {
      throw new Error('The directory cannot be an empty value');
    }

    const basePath = isDefined(baseDir) ? path.resolve(Directory.toPath(baseDir))
      : path.resolve();

    this._baseDirPath = basePath;
    this._dirPath = stringDirPath;
    this._fullPath = path.resolve(basePath, stringDirPath);
    this.isProtected = protect;
    this.safeWipeBoundaries = safeWipeBoundaries;
  }

  static resolve(dir: DirectoryLike): string {
    return path.resolve(this.toPath(dir));
  }

  static toPath(dir: DirectoryLike): string {
    if (typeof dir === 'string') {
      return dir;
    }
    if (Array.isArray(dir)) {
      return path.join(...dir);
    }
    return dir.fullPath;
  }

  get baseDirPath(): string {
    return this._baseDirPath;
  }

  get baseName(): string {
    return path.basename(this._fullPath);
  }

  get dirPath(): string {
    return path.basename(this._fullPath);
  }

  // The first segment of `dirPath`
  get dirPathRoot(): string {
    const firstSegment = this._dirPath.split(path.sep)[0];
    return path.resolve(this._baseDirPath, firstSegment);
  }

  get fullPath(): string {
    return this._fullPath;
  }

  get relativePath(): string {
    return path.relative(path.resolve(), this.fullPath);
  }

  get shortestPathFromBaseDir(): string {
    const relativePath = path.relative(this._baseDirPath, this._fullPath);
    return this._fullPath.length < relativePath.length ? this._fullPath
      : relativePath;
  }

  get shortestPathToBaseDir(): string {
    const relativePath = path.relative(this._fullPath, this._baseDirPath);
    return this._baseDirPath.length < relativePath.length ? this._baseDirPath
      : relativePath;
  }

  async exists(): Promise<boolean> {
    return util.promisify(fs.exists)(this.fullPath);
  }

  existsSync(): boolean {
    return fs.existsSync(this.fullPath);
  }

  // TODO: Support a series of arguments, as `path.join` does
  join(targetPath: PathLike): string {
    return path.join(this.fullPath, toPath(targetPath));
  }

  async make(): Promise<Directory> {
    await util.promisify(fs.mkdir)(this.fullPath, { recursive: true });
    return this;
  }

  makeSync(): Directory {
    fs.mkdirSync(this.fullPath, { recursive: true });
    return this;
  }

  resolve(targetPath: DirectoryLike): string {
    return path.resolve(this.fullPath, Directory.toPath(targetPath));
  }

  async safeWipe(options: DirectoryWipeOptions = {}): Promise<SafeWipeResult> {
    const { unprotect = false, ...safeWipeOptions } = options;
    if (this.isProtected && !unprotect) {
      const result = await safeWipe(this.fullPath, { dryRun: true });
      return {
        ...result,
        status: result.status === 'dry run' ? 'protected' : result.status,
      };
    }
    return safeWipe(this.fullPath, safeWipeOptions);
  }

  safeWipeSync(options: DirectoryWipeOptions = {}): SafeWipeResult {
    const { unprotect = false, ...safeWipeOptions } = options;
    if (this.isProtected && !unprotect) {
      const result = safeWipeSync(this.fullPath, { dryRun: true });
      return {
        ...result,
        status: result.status === 'dry run' ? 'protected' : result.status,
      };
    }
    return safeWipeSync(this.fullPath, safeWipeOptions);
  }
}
