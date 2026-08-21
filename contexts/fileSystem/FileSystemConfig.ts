import { CopyOnWrite, Fetch } from "@zenfs/core";
import { IndexedDB } from "@zenfs/dom";
import { fs9pToZenIndex } from "contexts/fileSystem/core";

export const ZENFS_STORE_NAME = "zenfs";

const index = fs9pToZenIndex();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
const FileSystemConfig = () => ({
  mounts: {
    "/": {
      backend: CopyOnWrite,
      readable: {
        backend: Fetch,
        // Do not preload every public file during startup. Files are fetched
        // lazily when the desktop or an application actually reads them.
        baseUrl:
          typeof window === "undefined"
            ? "http://localhost/"
            : window.location.origin,
        disableAsyncCache: true,
        index,
      },
      writable: {
        backend: IndexedDB,
        // Do not eagerly preload every IndexedDB key into memory at startup.
        // File writes are infrequent; reads of freshly written data go
        // through CopyOnWrite's writable layer directly.
        disableAsyncCache: true,
        storeName: ZENFS_STORE_NAME,
      },
    },
  },
});

export default FileSystemConfig;
