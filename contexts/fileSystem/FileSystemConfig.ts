import { type FileSystemConfiguration } from "browserfs";
import { fs9pToBfs } from "contexts/fileSystem/core";

const index = fs9pToBfs();

const FileSystemConfig = (): FileSystemConfiguration => ({
  fs: "MountableFileSystem",
  options: {
    "/": {
      fs: "OverlayFS",
      options: {
        readable: {
          fs: "HTTPRequest",
          options: { index },
        },
        // Writes stay in memory so a refresh restores the deployed filesystem
        writable: {
          fs: "InMemory",
        },
      },
    },
  },
});

export default FileSystemConfig;
