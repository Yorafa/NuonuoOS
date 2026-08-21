import { extname, join } from "path";
import { type IndexData, type InodeLike } from "@zenfs/core";
import { S_IFDIR, S_IFREG } from "@zenfs/core/constants";
import { type openDB } from "idb";
import { type Mount } from "contexts/fileSystem/zenfs";
import index from "public/.index/fs.9p.json";
import {
  FS_HANDLES,
  MOUNTABLE_EXTENSIONS,
  MOUNTABLE_FS_TYPES,
  ONE_TIME_PASSIVE_EVENT,
} from "utils/constants";

export type FS9PV4 = [string, number, number, FS9PV4[] | undefined];

type FileSystemHandles = Record<string, FileSystemDirectoryHandle>;

export const UNKNOWN_SIZE = -1;
export const UNKNOWN_STATE_CODES = new Set(["EIO", "ENOENT"]);
export const KEYVAL_STORE_NAME = "keyval";

export const KEYVAL_DB = `${KEYVAL_STORE_NAME}-store`;

const IDX_SIZE = 1;
const IDX_MTIME = 2;
const IDX_TARGET = 3;
const IDX_UID = 0;
const IDX_GID = 0;
const fsroot = index.fsroot as FS9PV4[];

const get9pData = (
  path: string,
  pathIndex: typeof IDX_SIZE | typeof IDX_MTIME
): number => {
  let fsPath = fsroot;
  let data = UNKNOWN_SIZE;

  path
    .split("/")
    .filter(Boolean)
    .forEach((pathPart) => {
      const pathBranch = fsPath.find(([name]) => name === pathPart);

      if (pathBranch) {
        const isBranch = Array.isArray(pathBranch[IDX_TARGET]);

        if (!isBranch) data = pathBranch[pathIndex];
        fsPath = isBranch ? (pathBranch[IDX_TARGET] as FS9PV4[]) : [];
      }
    });

  return data;
};

export const get9pModifiedTime = (path: string): number =>
  get9pData(path, IDX_MTIME);

export const get9pSize = (path: string): number => get9pData(path, IDX_SIZE);

const createZenIndexEntry = (
  mode: number,
  size: number,
  modifiedTime: number,
  ino: number
): InodeLike => ({
  atimeMs: modifiedTime,
  birthtimeMs: modifiedTime,
  ctimeMs: modifiedTime,
  gid: IDX_GID,
  ino,
  mode,
  mtimeMs: modifiedTime,
  nlink: 1,
  size,
  uid: IDX_UID,
});

export const fs9pToZenIndex = (entries: FS9PV4[] = fsroot): IndexData => {
  const zenEntries: Record<string, InodeLike> = {
    "/": createZenIndexEntry(S_IFDIR + 0o755, 0, 0, 0),
  };
  let nextIno = 1;

  const visit = (directory: FS9PV4[], parent = "/"): void => {
    // 9p v4 entry layout: [name, size, mtime, target]. `IDX_SIZE = 1`,
    // `IDX_MTIME = 2` keep this convention consistent with `get9pData`.
    directory.forEach(([name, size, modifiedTime, target]) => {
      const path = join(parent, name);
      const isDirectory = Array.isArray(target);
      const mode = isDirectory ? S_IFDIR + 0o755 : S_IFREG + 0o644;

      zenEntries[path] = createZenIndexEntry(
        mode,
        isDirectory ? 0 : size,
        modifiedTime,
        nextIno++
      );

      if (isDirectory) visit(target, path);
    });
  };

  visit(entries);

  return { entries: zenEntries, version: 1 };
};

export const supportsIndexedDB = (): Promise<boolean> =>
  new Promise((resolve) => {
    try {
      const db = window.indexedDB.open("zenfs-support");

      db.addEventListener(
        "error",
        () => resolve(false),
        ONE_TIME_PASSIVE_EVENT
      );
      db.addEventListener(
        "success",
        ({ target }) => {
          resolve(true);

          try {
            db.result.close();
          } catch {
            // Ignore errors to close database
          }

          const { objectStoreNames } =
            (target as IDBOpenDBRequest)?.result || {};

          if (objectStoreNames?.length === 0) {
            try {
              window.indexedDB.deleteDatabase("zenfs-support");
            } catch {
              // Ignore errors to delete database
            }
          }
        },
        ONE_TIME_PASSIVE_EVENT
      );
    } catch {
      resolve(false);
    }
  });

export const hasIndexedDB = async (name: string): Promise<boolean> =>
  new Promise((resolve) => {
    try {
      const db = window.indexedDB.open(name);

      db.addEventListener("upgradeneeded", () => {
        db.transaction?.abort();
        resolve(false);
      });
      db.addEventListener("success", () => {
        db.result.close();
        resolve(true);
      });
      db.addEventListener("error", () => resolve(false));
      db.addEventListener("blocked", () => resolve(false));
    } catch {
      resolve(false);
    }
  });

export const getKeyValStore = async (): ReturnType<typeof openDB> =>
  (await import("idb")).openDB(KEYVAL_DB, 1, {
    upgrade: (db) => db.createObjectStore(KEYVAL_STORE_NAME),
  });

export const getFileSystemHandles = async (): Promise<FileSystemHandles> => {
  if (!(await supportsIndexedDB())) {
    return Object.create(null) as FileSystemHandles;
  }

  const db = await getKeyValStore();

  return (
    (await (db.get(
      KEYVAL_STORE_NAME,
      FS_HANDLES
    ) as Promise<FileSystemHandles>)) ||
    (Object.create(null) as FileSystemHandles)
  );
};

export const isMountedFolder = (mount?: Mount): boolean =>
  typeof mount === "object" && MOUNTABLE_FS_TYPES.has(mount.getName());

export const getMountUrl = (
  url: string,
  mntMap: Record<string, Mount>
): string | undefined => {
  if (url === "/") return "";
  if (mntMap[url] || MOUNTABLE_EXTENSIONS.has(extname(url))) return url;

  return Object.keys(mntMap)
    .filter((mountedUrl) => mountedUrl !== "/")
    .find(
      (mountedUrl) => url === mountedUrl || url.startsWith(`${mountedUrl}/`)
    );
};
