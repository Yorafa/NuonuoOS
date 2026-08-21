import {
  fs as zenFs,
  mount as zenMount,
  umount as zenUmount,
  type FileSystem,
  type Stats,
} from "@zenfs/core";

export type ZenFSError = Error & {
  code?: string;
  path?: string;
};

type FSCallback<T = void> = (error: ZenFSError | undefined, data?: T) => void;

type ReadFileOptions = {
  flag?: string;
};

type WriteFileOptions = {
  flag?: string;
};

export interface FSModule {
  exists: (path: string, callback: (exists: boolean) => void) => void;
  lstat: (path: string, callback: FSCallback<Stats>) => void;
  mkdir: {
    (path: string, callback: FSCallback): void;
    (
      path: string,
      options: { recursive?: boolean },
      callback: FSCallback
    ): void;
  };
  readonly promises: typeof zenFs.promises;
  readFile: {
    (path: string, callback: FSCallback<Buffer>): void;
    (
      path: string,
      options: ReadFileOptions,
      callback: FSCallback<Buffer>
    ): void;
  };
  readdir: (path: string, callback: FSCallback<string[]>) => void;
  rename: (oldPath: string, newPath: string, callback: FSCallback) => void;
  rmdir: (path: string, callback: FSCallback) => void;
  stat: (path: string, callback: FSCallback<Stats>) => void;
  unlink: (path: string, callback: FSCallback) => void;
  writeFile: {
    (path: string, data: Buffer | string, callback: FSCallback): void;
    (
      path: string,
      data: Buffer | string,
      options: WriteFileOptions,
      callback: FSCallback
    ): void;
  };
}

export type ZenStats = Stats;

export type Mount = {
  _data?: Buffer;
  data?: Buffer;
  fs: FileSystem;
  getName: () => string;
};

export type RootFileSystem = {
  mntMap: Record<string, Mount>;
  mount: (
    mountPoint: string,
    fileSystem: FileSystem,
    data?: Buffer,
    name?: string
  ) => void;
  mountList: string[];
  readable: FileSystem;
  umount: (mountPoint: string) => void;
  writable: FileSystem;
};

const getError = (error: unknown): ZenFSError =>
  error instanceof Error
    ? (error as ZenFSError)
    : Object.assign(new Error(String(error)), error as object);

const resolveCallback = <T>(
  operation: Promise<T>,
  callback: FSCallback<T>
): void => {
  operation.then(
    (data) => callback(undefined, data),
    (error: unknown) => callback(getError(error))
  );
};

const splitOptions = <T extends object, R = void>(
  optionsOrCallback: T | FSCallback<R>,
  callback?: FSCallback<R>
): [T | undefined, FSCallback<R>] =>
  typeof optionsOrCallback === "function"
    ? [undefined, optionsOrCallback]
    : [optionsOrCallback, callback as FSCallback<R>];

export const createFSModule = (): FSModule => ({
  exists: (path, callback) =>
    zenFs.promises
      .exists(path)
      .then(callback)
      .catch(() => callback(false)),
  lstat: (path, callback) =>
    resolveCallback(zenFs.promises.lstat(path), callback),
  mkdir: ((
    path: string,
    optionsOrCallback: { recursive?: boolean } | FSCallback = {},
    callback?: FSCallback
  ): void => {
    const [options, done] = splitOptions(optionsOrCallback, callback);

    resolveCallback(
      zenFs.promises.mkdir(path, options),
      done as FSCallback<string | undefined>
    );
  }) as FSModule["mkdir"],
  promises: zenFs.promises,
  readFile: ((
    path: string,
    optionsOrCallback: ReadFileOptions | FSCallback<Buffer> = {},
    callback?: FSCallback<Buffer>
  ): void => {
    const [options, done] = splitOptions<ReadFileOptions, Buffer>(
      optionsOrCallback,
      callback
    );

    resolveCallback(
      zenFs.promises.readFile(path, options).then((data) => Buffer.from(data)),
      done
    );
  }) as FSModule["readFile"],
  readdir: (path, callback) =>
    resolveCallback(zenFs.promises.readdir(path), callback),
  rename: (oldPath, newPath, callback) =>
    resolveCallback(zenFs.promises.rename(oldPath, newPath), callback),
  rmdir: (path, callback) =>
    resolveCallback(zenFs.promises.rmdir(path), callback),
  stat: (path, callback) =>
    resolveCallback(zenFs.promises.stat(path), callback),
  unlink: (path, callback) =>
    resolveCallback(zenFs.promises.unlink(path), callback),
  writeFile: ((
    path: string,
    data: Buffer | string,
    optionsOrCallback: WriteFileOptions | FSCallback = {},
    callback?: FSCallback
  ): void => {
    const [options, done] = splitOptions<WriteFileOptions>(
      optionsOrCallback,
      callback
    );

    resolveCallback(zenFs.promises.writeFile(path, data, options), done);
  }) as FSModule["writeFile"],
});

export const createMount = (
  fileSystem: FileSystem,
  data?: Buffer,
  name = fileSystem.name
): Mount => ({
  ...(data ? { _data: data, data } : {}),
  fs: fileSystem,
  getName: () => name,
});

export const createRootFileSystem = (
  fileSystem: FileSystem,
  readable: FileSystem,
  writable: FileSystem
): RootFileSystem => {
  const mntMap: Record<string, Mount> = {
    "/": createMount(fileSystem),
  };
  const mountList = ["/"];

  return {
    mntMap,
    mount: (mountPoint, mountedFileSystem, data, name) => {
      const normalizedPath = mountPoint.startsWith("/")
        ? mountPoint
        : `/${mountPoint}`;

      zenMount(normalizedPath, mountedFileSystem);
      mntMap[normalizedPath] = createMount(mountedFileSystem, data, name);

      if (!mountList.includes(normalizedPath)) mountList.push(normalizedPath);
    },
    mountList,
    readable,
    umount: (mountPoint) => {
      const normalizedPath = mountPoint.startsWith("/")
        ? mountPoint
        : `/${mountPoint}`;

      zenUmount(normalizedPath);
      delete mntMap[normalizedPath];

      const mountIndex = mountList.indexOf(normalizedPath);
      if (mountIndex !== -1) mountList.splice(mountIndex, 1);
    },
    writable,
  };
};
