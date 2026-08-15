import { EDITABLE_IMAGE_FILE_EXTENSIONS, TEXT_EDITORS } from "utils/constants";

type Extension = {
  command?: string;
  icon?: string;
  process: string[];
  type?: string;
};

const types = {
  Application: {
    icon: "executable",
    process: ["BoxedWine", "JSDOS"],
    type: "Application",
  },
  AudioPlaylist: {
    icon: "audio",
    process: ["Webamp"],
    type: "Audio Playlist File",
  },
  ChessGame: {
    icon: "chess",
    process: ["Chess", ...TEXT_EDITORS],
    type: "Portable Game Notation File",
  },
  DiscImage: {
    icon: "image",
    process: ["V86"],
    type: "Disc Image File",
  },
  Font: {
    icon: "font",
    process: ["OpenType"],
    type: "Font File",
  },
  GraphicsEditor: {
    process: ["Photos", "Paint"],
    type: "Picture File",
  },
  HtmlDocument: {
    process: ["Browser", ...TEXT_EDITORS],
    type: "HTML Document",
  },
  Markdown: {
    icon: "marked",
    process: ["Marked", ...TEXT_EDITORS],
    type: "Markdown File",
  },
  MediaPlaylist: {
    process: ["VideoPlayer"],
    type: "Media Playlist File",
  },
  MountableDiscImage: {
    icon: "image",
    process: ["FileExplorer", "V86"],
    type: "Disc Image File",
  },
  Music: {
    icon: "audio",
    process: ["Webamp", "VideoPlayer"],
  },
  PdfDocument: {
    icon: "pdf",
    process: ["PDF"],
    type: "PDF Document",
  },
  PythonFile: {
    command: "py",
    icon: "python",
    process: ["Terminal", ...TEXT_EDITORS],
    type: "Python File",
  },
  ScreenSaver: {
    process: ["ScreenSaver"],
    type: "Screen Saver",
  },
  SvgFile: {
    process: ["Photos", ...TEXT_EDITORS],
    type: "Scalable Vector Graphics File",
  },
  WasmFile: {
    command: "wapm",
    icon: "wapm",
    process: ["Terminal"],
    type: "WebAssembly Module File",
  },
  WinampSkin: {
    icon: "audio",
    process: ["Webamp", "FileExplorer"],
    type: "Winamp Skin File",
  },
  ZipFile: {
    icon: "compressed",
    process: ["FileExplorer", "BoxedWine", "JSDOS"],
    type: "Compressed (zipped) Folder",
  },
};

const extensions: Record<string, Extension> = {
  ".asx": types.AudioPlaylist,
  ".bin": types.DiscImage,
  ".dsk": types.DiscImage,
  ".exe": types.Application,
  ".htm": types.HtmlDocument,
  ".html": types.HtmlDocument,
  ".img": types.DiscImage,
  ".iso": types.MountableDiscImage,
  ".m3u": types.AudioPlaylist,
  ".m3u8": types.MediaPlaylist,
  ".md": types.Markdown,
  ".mp3": types.Music,
  ".otf": types.Font,
  ".pdf": types.PdfDocument,
  ".pgn": types.ChessGame,
  ".pls": types.AudioPlaylist,
  ".py": types.PythonFile,
  ".svg": types.SvgFile,
  ".ttf": types.Font,
  ".wasm": types.WasmFile,
  ".woff": types.Font,
  ".wsz": types.WinampSkin,
  ".xscr": types.ScreenSaver,
  ".zip": types.ZipFile,
};

const addType =
  (type: Extension) =>
  (extension: string): void => {
    if (type.process) {
      if (extensions[extension]) {
        extensions[extension].process.push(...type.process);
      } else {
        extensions[extension] = type;
      }
    }
  };

EDITABLE_IMAGE_FILE_EXTENSIONS.forEach(addType(types.GraphicsEditor));

export default extensions;
