import dynamic from "next/dynamic";
import { type Processes } from "contexts/process/types";
import { FOLDER_ICON, TASKBAR_HEIGHT } from "utils/constants";

const directory: Processes = {
  Browser: {
    Component: dynamic(() => import("components/apps/Browser")),
    backgroundColor: "#FFF",
    defaultSize: {
      height: 500,
      width: 600,
    },
    icon: "/System/Icons/chromium.webp",
    title: "Browser",
  },
  Chess: {
    Component: dynamic(() => import("components/apps/Chess")),
    backgroundColor: "#312E2B",
    defaultSize: {
      height: 567,
      width: 420,
    },
    icon: "/System/Icons/chess.webp",
    libs: ["/Program Files/Chess/chessboard2.min.css"],
    title: "Chess",
  },
  FileExplorer: {
    Component: dynamic(() => import("components/apps/FileExplorer")),
    backgroundColor: "#202020",
    defaultSize: {
      height: 325,
      width: 447,
    },
    icon: FOLDER_ICON,
    title: "File Explorer",
  },
  Marked: {
    Component: dynamic(() => import("components/apps/Marked")),
    backgroundColor: "#FFF",
    defaultSize: {
      height: 480,
      width: 560,
    },
    icon: "/System/Icons/marked.webp",
    libs: [
      "/Program Files/Marked/marked.min.js",
      "/Program Files/Marked/purify.min.js",
    ],
    title: "Marked",
  },
  OpenType: {
    Component: dynamic(() => import("components/apps/OpenType")),
    backgroundColor: "#FFF",
    icon: "/System/Icons/opentype.webp",
    preferProcessIcon: true,
    title: "OpenType",
  },
  OpenWith: {
    Component: dynamic(() => import("components/system/Dialogs/OpenWith")),
    allowResizing: false,
    backgroundColor: "#FFF",
    defaultSize: {
      height: 492,
      width: 392,
    },
    dialogProcess: true,
    hideTaskbarEntry: true,
    hideTitlebar: true,
    icon: "/System/Icons/unknown.webp",
    title: "Open With",
  },
  PDF: {
    Component: dynamic(() => import("components/apps/PDF")),
    backgroundColor: "#525659",
    icon: "/System/Icons/pdf.webp",
    libs: ["/Program Files/PDF.js/pdf.js"],
    title: "PDF",
  },
  Photos: {
    Component: dynamic(() => import("components/apps/Photos")),
    backgroundColor: "#222",
    defaultSize: {
      height: 432,
      width: 576,
    },
    hideTitlebarIcon: true,
    icon: "/System/Icons/photos.webp",
    title: "Photos",
  },
  Properties: {
    Component: dynamic(() => import("components/system/Dialogs/Properties")),
    allowResizing: false,
    backgroundColor: "rgb(240, 240, 240)",
    defaultSize: {
      height: 412,
      width: 361,
    },
    dialogProcess: true,
    hideMaximizeButton: true,
    hideMinimizeButton: true,
    icon: "",
    title: "Properties",
  },
  Run: {
    Component: dynamic(() => import("components/system/Dialogs/Run")),
    allowResizing: false,
    defaultSize: {
      height: 174,
      width: 397,
    },
    dialogProcess: true,
    hideMaximizeButton: true,
    hideMinimizeButton: true,
    icon: "/System/Icons/run.webp",
    initialRelativePosition: {
      bottom: TASKBAR_HEIGHT + 11,
      left: 15,
    },
    singleton: true,
    title: "Run",
  },
  ScreenSaver: {
    Component: dynamic(() => import("components/system/Dialogs/ScreenSaver")),
    allowResizing: false,
    dialogProcess: true,
    hasWindow: false,
    hideTaskbarEntry: true,
    icon: "/System/Icons/screensaver.webp",
    singleton: true,
    title: "Screen Saver",
  },
  Terminal: {
    Component: dynamic(() => import("components/apps/Terminal")),
    backgroundBlur: "8px",
    backgroundColor: "rgba(12, 12, 12, 0.5)",
    defaultSize: {
      height: 374,
      width: 615,
    },
    icon: "/System/Icons/xterm.webp",
    libs: [
      "/Program Files/Xterm.js/xterm.css",
      "/Program Files/Xterm.js/xterm.js",
      "/Program Files/Xterm.js/xterm-addon-fit.js",
      "/Program Files/Xterm.js/local-echo.js",
    ],
    preferProcessIcon: true,
    title: "Terminal",
  },
  Transfer: {
    Component: dynamic(() => import("components/system/Dialogs/Transfer")),
    allowResizing: false,
    backgroundColor: "#FFF",
    defaultSize: {
      height: 163,
      width: 400,
    },
    dialogProcess: true,
    icon: "/System/Icons/copying.webp",
    title: "",
  },
  VideoPlayer: {
    Component: dynamic(() => import("components/apps/VideoPlayer")),
    autoSizing: true,
    backgroundColor: "#000",
    defaultSize: {
      height: 390,
      width: 640,
    },
    icon: "/System/Icons/vlc.webp",
    libs: [
      "/Program Files/Video.js/video-js.min.css",
      "/Program Files/Video.js/video.min.js",
      "/Program Files/Video.js/Youtube.min.js",
    ],
    title: "Video Player",
  },
  Vim: {
    Component: dynamic(() => import("components/apps/Vim")),
    allowResizing: false,
    backgroundColor: "#222324",
    defaultSize: {
      height: 448,
      width: 595,
    },
    icon: "/System/Icons/vim.webp",
    libs: ["/Program Files/Vim.js/vim.js"],
    singleton: true,
    title: "Vim",
  },
  Webamp: {
    Component: dynamic(() => import("components/apps/Webamp")),
    allowResizing: false,
    hasWindow: false,
    icon: "/System/Icons/webamp.webp",
    libs: ["/Program Files/Webamp/webamp.bundle.min.js"],
    singleton: true,
    title: "Webamp",
  },
};

export default directory;
