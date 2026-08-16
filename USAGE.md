# daedalOS 使用与自定义指南

本指南面向想要**使用和定制**本项目的人，重点解答最常见的问题：*"我添加一个文件，怎么让它出现在桌面 / 文件管理器里？"* 以及快捷方式、图标、默认打开方式、新增应用等自定义玩法。

项目的整体功能介绍见 [README.md](README.md)。

---

## 目录

1. [核心概念：文件是怎么显示在前端的](#1-核心概念文件是怎么显示在前端的)
2. [添加文件让前端显示（预置文件）](#2-添加文件让前端显示预置文件)
3. [运行时添加文件（无需重新构建）](#3-运行时添加文件无需重新构建)
4. [文件类型与默认打开应用](#4-文件类型与默认打开应用)
5. [快捷方式（.url 文件）](#5-快捷方式url-文件)
6. [自定义文件夹图标（desktop.ini）](#6-自定义文件夹图标desktopini)
7. [图标系统](#7-图标系统)
8. [会话与持久化](#8-会话与持久化)
9. [添加新应用](#9-添加新应用)
10. [常见问题](#10-常见问题)

---

## 1. 核心概念：文件是怎么显示在前端的

daedalOS 在浏览器里模拟了一个操作系统，桌面、资源管理器、开始菜单里看到的所有文件都来自一个**虚拟文件系统**。它由三层组成：

```
┌─────────────────────────────────────────────┐
│              虚拟文件系统 (OverlayFS)         │
│                                             │
│  可写层: IndexedDB        ← 浏览器里的操作    │
│    (新建/删除/重命名/编辑的内容存在这里)        │
│  ───────────────────────                    │
│  只读层: HTTP 请求          ← 预置的内容       │
│    (即仓库中的 public/ 目录,按索引加载)        │
└─────────────────────────────────────────────┘
```

关键点：

- **`public/` 目录就是系统盘**。放在 `public/` 下的文件会按原样映射到虚拟文件系统中（`public/Users/Public/x.txt` → 虚拟路径 `/Users/Public/x.txt`）。
- 只读层并不能真的去"扫描"服务器目录，它依赖一份**索引文件** [`public/.index/fs.9p.json`](public/.index/fs.9p.json)（记录文件名、大小、修改时间）。这份索引由脚本 [`scripts/fs2json.js`](scripts/fs2json.js) 在构建时生成，见 [`contexts/fileSystem/FileSystemConfig.ts`](contexts/fileSystem/FileSystemConfig.ts)。
- 用户在浏览器里做的任何修改（新建、删除、拖入文件、改壁纸等）都**只写进本浏览器的 IndexedDB**，不会改动服务器上的文件。同名文件时，IndexedDB 里的版本会**遮盖** `public/` 里的预置版本。

## 2. 添加文件让前端显示（预置文件）

想让某个文件"出厂自带"，随系统一起展示给所有访问者，步骤如下：

1. 把文件放进 `public/` 下的目标位置（目录含义见下表）；
2. 重新生成文件系统索引：

   ```bash
   yarn build:fs:public    # 只重新生成 fs.9p.json（最快）
   # 或
   yarn build:prebuild     # 完整预构建：索引 + 搜索 + 图标缓存等（推荐）
   ```

3. 刷新页面即可看到。

### 放在哪里，显示在哪里

| 仓库路径（public/ 下） | 虚拟路径 | 前端效果 |
| --- | --- | --- |
| `Users/Public/Desktop/` | `/Users/Public/Desktop` | **桌面图标**（桌面就是对这个文件夹的文件管理器视图） |
| `Users/Public/Start Menu/` | `/Users/Public/Start Menu` | **开始菜单**里的条目（支持子文件夹分组） |
| `Users/Public/Documents/` 等 | `/Users/Public/Documents` 等 | 用户文件夹（文档/音乐/图片/视频） |
| `Program Files/` | `/Program Files` | 存放应用所需的第三方库文件（不参与开始菜单搜索） |
| `System/` | `/System` | 系统资源：图标、屏保（`.xscr`）、WASM 工具等 |
| 根目录，如 `CREDITS.md` | `/CREDITS.md` | 可通过 `/?url=/CREDITS.md` 直接打开 |

### 注意事项

- **不重新生成索引就看不到新文件**——这是最常见的"我加了文件怎么没显示"的原因。
- `public/.index/` 和 `public/private/` 会被索引脚本排除（见 `package.json` 中的 `build:fs:public`）。
- 如果某个文件之前在浏览器里被打开并保存过（或删除过），IndexedDB 里的记录会遮盖/隐藏你在 `public/` 里的新版本。此时用**开始菜单 → Power（清除会话并刷新）**，或清除浏览器站点数据后重试。
- 文件名支持中文和空格；索引中记录的大小与修改时间会用于资源管理器的排序与详细信息视图。

## 3. 运行时添加文件（无需重新构建）

作为普通使用者，不需要动仓库代码就能往系统里加文件：

- **拖拽**：把本地文件（或文件夹）直接拖到桌面或任意资源管理器窗口，会显示传输进度对话框；
- **右键菜单**：在资源管理器空白处右键 → *添加文件* / *新建文件夹* / *新建文本文档*；
- **映射本地目录**：右键 → *映射目录*（基于 File System Access API，需浏览器支持，如 Chrome/Edge）；
- **终端**：用 Terminal 里的文件系统命令创建。

这些内容全部保存在浏览器 IndexedDB 中——换台电脑、换个浏览器、或点了 Power，就都不见了。想"固化"成预置内容，就把文件复制进 `public/` 再按第 2 节重新生成索引。

## 4. 文件类型与默认打开应用

双击文件时用哪个应用打开，由扩展名映射表决定：[`components/system/Files/FileEntry/extensions.ts`](components/system/Files/FileEntry/extensions.ts)。当前默认值摘录：

| 扩展名 | 默认应用 | 备注 |
| --- | --- | --- |
| `.md` | **Marked** | Markdown 渲染，可再用 Vim 编辑 |
| `.pdf` | **PDF** | |
| `.htm` / `.html` | **Browser** | |
| `.otf` / `.ttf` / `.woff` | **OpenType** | 字体预览 |
| 图片（png/jpg/webp/heic/jxl/qoi/tiff…） | **Photos** | 部分格式可再用文本编辑器打开 |
| 音频 / 视频 / 播放列表（`.m3u` 等） | **VideoPlayer** | 支持 YouTube 链接 |
| `.zip` / `.iso` | **FileExplorer** | 双击挂载为文件夹浏览 |
| `.xscr` | **ScreenSaver** | 屏保，`public/System/` 下有示例 |
| `.wasm` | **Terminal** | 通过 `wapm` 运行 |
| 其他文本类文件 | **Vim** | |

想给新扩展名指定默认应用，在 `extensions.ts` 的 `extensions` 表里加一行即可，例如：

```ts
const extensions: Record<string, Extension> = {
  // ...
  ".log": { process: ["Vim"], type: "Log File" },
};
```

未注册的类型双击时会弹出**"打开方式"对话框**让用户选择。

## 5. 快捷方式（.url 文件）

`.url` 文件是系统内的快捷方式，本质是 INI 格式文本。桌面的 `Public.url`、开始菜单里的 `Terminal.url` 都是这种文件：

```ini
; public/Users/Public/Start Menu/Terminal.url
[InternetShortcut]
BaseURL=Terminal
Comment=Command-line Interpreter
IconFile=/System/Icons/xterm.webp
```

```ini
; public/Users/Public/Desktop/Public.url —— 指向文件夹的快捷方式
[InternetShortcut]
BaseURL=FileExplorer
URL=/Users/Public
IconFile=/System/Icons/user.webp
Type=System
```

字段说明：

| 字段 | 作用 |
| --- | --- |
| `BaseURL` | 打开所用的**应用 ID**（即 [`contexts/process/directory.ts`](contexts/process/directory.ts) 里的键名，如 `Browser`、`Marked`、`VideoPlayer`） |
| `URL` | 目标：虚拟文件系统路径（如 `/Users/Public`）或网页地址（用 Browser 打开） |
| `IconFile` | 图标路径，见[第 7 节](#7-图标系统) |
| `Comment` | 悬浮提示/描述文字 |
| `Type=System` | 标记为系统快捷方式：不显示快捷方式小箭头角标，排序时置顶（可选） |

用法：把 `.url` 文件放进 `Users/Public/Desktop/` 就在桌面生成图标，放进 `Users/Public/Start Menu/` 就出现在开始菜单。用户也可以在资源管理器里右键任意文件 → *创建快捷方式*。

## 6. 自定义文件夹图标（desktop.ini）

在文件夹里放一个 `desktop.ini` 即可指定该文件夹的图标：

```ini
; public/Users/Public/Documents/desktop.ini
[ShellClassInfo]
IconFile=/System/Icons/documents.webp
```

- 对 `public/` 里**预置**的文件夹：图标在预构建时被缓存进 `public/.index/iniIcons.json`，修改后需重新运行 `yarn build:prebuild` 才生效；
- 用户在浏览器里**运行时新建**的文件夹：`desktop.ini` 会被实时读取，改完立即生效。

## 7. 图标系统

引用系统图标时统一写**不带尺寸目录**的路径，如 `/System/Icons/folder.webp`：

- 实际文件存放在 [`public/System/Icons/`](public/System/Icons) 的尺寸子目录中：`16x16/`、`32x32/`、`48x48/`、`96x96/`、`144x144/`；
- 渲染时 `Icon` 组件（[`styles/common/Icon.tsx`](styles/common/Icon.tsx)）会按设备像素比自动改写到对应尺寸目录并生成 `srcset`（高分屏用大图）。

新增一个自定义图标 `myapp.webp` 的步骤：

1. 准备一张最大尺寸（144×144）的 PNG；
2. 生成各尺寸副本放入对应目录（可借助 [`scripts/createIcons.bat`](scripts/createIcons.bat)，依赖 ImageMagick 与 cwebp，或手动缩放导出）；
3. 之后即可在 `directory.ts`、`.url` 的 `IconFile` 或 `desktop.ini` 中用 `/System/Icons/myapp.webp` 引用。

另外，系统会为音乐/图片/视频等媒体文件**动态生成缓存图标**（缩略图、专辑封面），缓存在虚拟路径 `/Users/Public/Icons/Cache/` 下，无需手动处理。

## 8. 会话与持久化

系统会话（壁纸、主题、窗口位置与尺寸、图标排列、最近文件、Run 历史等）会自动写入虚拟文件系统里的 `/session.json`，即浏览器的 IndexedDB。

- **默认会话**来自仓库中的 [`public/session.json`](public/session.json)（当前为空 `{}`，即全部使用内置默认值）。想给所有访问者预置一套壁纸或窗口布局，可以编辑它；
- 用户点开始菜单的 **Power** 会清空 IndexedDB、localStorage 并刷新页面，恢复到 `public/` 预置的初始状态；
- URL 参数可以直接打开内容，便于分享：
  - `/?app=Terminal` —— 启动指定应用；
  - `/?url=/CREDITS.md` —— 打开指定文件。

## 9. 添加新应用

1. 在 [`components/apps/`](components/apps) 下创建组件目录，如 `components/apps/MyApp/index.tsx`；
2. 在 [`contexts/process/directory.ts`](contexts/process/directory.ts) 中注册：

   ```ts
   const directory: Processes = {
     // ...
     MyApp: {
       Component: dynamic(() => import("components/apps/MyApp")),
       icon: "/System/Icons/myapp.webp",
       title: "My App",
       defaultSize: { height: 480, width: 640 },
     },
   };
   ```

   常用可选字段：`defaultSize`（初始窗口大小）、`backgroundColor`（窗口底色）、`libs`（启动时预加载的虚拟文件系统中的 JS/CSS，如 `/Program Files/...` 下的库）、`singleton`（全局单例窗口）、`autoSizing`、`hideTaskbarEntry` 等，完整定义见 [`contexts/process/types.ts`](contexts/process/types.ts)；
3. 放置图标文件（见[第 7 节](#7-图标系统)）；
4. 在 `public/Users/Public/Start Menu/` 添加 `MyApp.url`（见[第 5 节](#5-快捷方式url-文件)），它就会出现在开始菜单；如需文件关联，再在 `extensions.ts` 中把对应扩展名指向 `"MyApp"`。

## 10. 常见问题

**加了文件，前端看不到？**
按顺序排查：是否重新运行了 `yarn build:fs:public`；是否被浏览器缓存挡住（强制刷新）；是否之前在浏览器里改/删过同名文件（用 Power 清除会话后重试）。

**开始菜单搜索搜不到新文件？**
搜索索引（`yarn build:prebuild` 生成 `public/.index/search.lunr.json`）只收录部分目录，且排除 `Program Files`、`System` 等（见 [`scripts/searchIndex.js`](scripts/searchIndex.js)）。确认文件放在被收录的目录（如 `Users/Public/...`）并运行了完整的 `build:prebuild`。

**为什么我修改了 `public/` 里的预置文件，页面上还是旧的？**
浏览器 IndexedDB 可写层里存有你之前的修改并遮盖了只读层。用 Power 清除会话，或清除站点数据。

**开发环境怎么跑？**
见 [README.md](README.md) 的"试一试"一节：`yarn install` → `yarn build:prebuild` → `yarn dev --webpack`（注意需要 `--webpack` 参数）。
