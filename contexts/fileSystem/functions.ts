import { join } from "path";
import { isDirectory, type FileSystem } from "@zenfs/core";
import { type FileSystemObserver } from "contexts/fileSystem/useFileSystemContextState";
import { FS_HANDLES } from "utils/constants";
import { type RootFileSystem } from "contexts/fileSystem/zenfs";
import { ZENFS_STORE_NAME } from "contexts/fileSystem/FileSystemConfig";
import {
  KEYVAL_STORE_NAME,
  getFileSystemHandles,
  getKeyValStore,
  supportsIndexedDB,
} from "contexts/fileSystem/core";

const KNOWN_IDB_DBS = [
  "/classicube",
  "/data/saves",
  "ejs-bios",
  "ejs-roms",
  "ejs-romsdata",
  "ejs-states",
  "ejs-system",
  "js-dos-cache (emulators-ui-saves)",
  "keyval-store",
];

const observers = new Map<string, FileSystemObserver>();

export const addFileSystemHandle = async (
  directory: string,
  handle: FileSystemDirectoryHandle,
  mappedName: string,
  observer?: FileSystemObserver
): Promise<void> => {
  if (!(await supportsIndexedDB())) return;

  const db = await getKeyValStore();
  const dirPath = join(directory, mappedName);

  try {
    await db.put(
      KEYVAL_STORE_NAME,
      {
        ...(await getFileSystemHandles()),
        [dirPath]: handle,
      },
      FS_HANDLES
    );

    if (observer) observers.set(dirPath, observer);
  } catch {
    // Ignore errors storing handle
  }
};

export const removeFileSystemHandle = async (
  directory: string
): Promise<void> => {
  if (!(await supportsIndexedDB())) return;

  const [{ [directory]: _removedHandle, ...handles }, db] = await Promise.all([
    getFileSystemHandles(),
    getKeyValStore(),
  ]);

  try {
    await db.put(KEYVAL_STORE_NAME, handles, FS_HANDLES);

    observers.get(directory)?.disconnect();
    observers.delete(directory);
  } catch {
    // Ignore errors storing handle
  }
};

export const requestPermission = async (
  url: string
): Promise<PermissionState | false> => {
  const fsHandles = await getFileSystemHandles();
  const handle = fsHandles[url];

  if (handle) {
    const currentPermissions = await handle.queryPermission();

    if (currentPermissions === "prompt") {
      await handle.requestPermission();
    } else if (currentPermissions === "granted") {
      throw new Error("Permission already granted");
    }

    return handle.queryPermission();
  }

  return false;
};

const emptyFileSystemAt = async (
  fileSystem: FileSystem,
  directory: string
): Promise<void> => {
  const entries = await fileSystem.readdir(directory);

  await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry);
      const stats = await fileSystem.stat(path);

      if (isDirectory(stats)) {
        await emptyFileSystemAt(fileSystem, path);
        await fileSystem.rmdir(path);
      } else {
        await fileSystem.unlink(path);
      }
    })
  );
};

const emptyFileSystem = async (fileSystem: FileSystem): Promise<void> => {
  const entries = await fileSystem.readdir("/");

  await Promise.all(
    entries.map(async (entry) => {
      const path = join("/", entry);
      const stats = await fileSystem.stat(path);

      if (isDirectory(stats)) {
        await emptyFileSystemAt(fileSystem, path);
        await fileSystem.rmdir(path);
      } else {
        await fileSystem.unlink(path);
      }
    })
  );
};

export const resetStorage = async (rootFs?: RootFileSystem): Promise<void> => {
  window.localStorage.clear();
  window.sessionStorage.clear();

  if (window.indexedDB) {
    try {
      const dbs = window.indexedDB.databases
        ? (await window.indexedDB.databases())
            .filter(
              ({ name }) =>
                typeof name === "string" && name !== ZENFS_STORE_NAME
            )
            .map(({ name }) => name as string)
        : KNOWN_IDB_DBS;

      const { deleteDB } = await import("idb");
      await Promise.all(dbs.map((name) => deleteDB(name)));
    } catch {
      // Ignore errors deleting databases
    }
  }

  if (rootFs?.writable) {
    await emptyFileSystem(rootFs.writable);
    await rootFs.writable.sync();
  }
};
